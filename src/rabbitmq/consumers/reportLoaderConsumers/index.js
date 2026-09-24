import { channel } from "../../setupRabbitMQ.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/utils/index.js";
import loader from "../../../routes/index/utils/loader.js";
import handleLongRangeReportLoading from "./handleLongRangeReportLoading.js";
import * as joiSchemas from "../../../routes/index/joiSchemas/index.schema.js";

var allUpTo = false;
var requeue = false;
var loadingStopReason = "";
var statusOfReportLoadingStop = false;

var isServerStartupLoad = false;
var queueName = "report.loading";
var resumeStoppedRoutingKey = "resume";
var abandonedReportLoadingRoutingKey = "abandoned";
var longRangeReportLoadingRoutingKey = "longrange";

export var reportLoaderConsumer = () =>
  channel.consume(
    queueName,
    async (msg) => {
      if (!msg?.content) {
        return channel.nack(msg, allUpTo, requeue);
      }

      try {
        var session = await dbClient.startSession();

        await session.withTransaction(async () => {
          var data = JSON.parse(msg.content);

          var routingKey = msg.fields?.routingKey;

          if (routingKey === longRangeReportLoadingRoutingKey) {
            var { error } = joiSchemas.reportLoaderSchema.validate(data);

            if (error) {
              return channel.nack(msg, allUpTo, requeue);
            }

            await handleLongRangeReportLoading(data, session);
          } else if (routingKey === abandonedReportLoadingRoutingKey) {
            var { error } = joiSchemas.resumeReportLoadingSchema.validate(data);

            if (error) {
              return channel.nack(msg, allUpTo, requeue);
            }

            await dbUtils.addAbandonedReportsToQueue(data.userId);
          } else if (routingKey === resumeStoppedRoutingKey) {
            var { error } = joiSchemas.resumeReportLoadingSchema.validate(data);

            if (error) {
              return channel.nack(msg, allUpTo, requeue);
            }

            await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason);
          }
        });

        channel.ack(msg);
        loader(userId, isServerStartupLoad);
      } catch (e) {
        return channel.nack(msg, allUpTo, requeue);
      }
    },
    { noAck: false },
  );
