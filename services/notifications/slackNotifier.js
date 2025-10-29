const { WebClient } = require('@slack/web-api');
require('dotenv').config();

class SlackNotifier {
  constructor() {
    this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
    this.channel = process.env.SLACK_CHANNEL || '#testing-alerts';
  }

  async sendErrorNotification(siteName, testName, error) {
    try {
      const message = {
        channel: this.channel,
        text: __("🚨 Erreur de test détectée"),
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: __("*🚨 Erreur de test détectée*")
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: __("*Site:*") + ` ${siteName}`
              },
              {
                type: "mrkdwn",
                text: __("*Test:*") + ` ${testName}`
              },
              {
                type: "mrkdwn",
                text: __("*Erreur:*") + ` ${error.message}`
              },
              {
                type: "mrkdwn",
                text: __("*Timestamp:*") + ` ${new Date().toLocaleString('fr-FR')}`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: __("*Détails de l'erreur:*") + `\n\`\`\`${error.stack}\`\`\``
            }
          }
        ]
      };

      await this.client.chat.postMessage(message);
      console.log(__("✅ Notification Slack envoyée avec succès"));
    } catch (slackError) {
      console.error(__("❌ Erreur lors de l'envoi de la notification Slack:"), slackError);
    }
  }

  async sendSuccessNotification(siteName, testName, duration) {
    try {
      const message = {
        channel: this.channel,
        text: __("✅ Test réussi"),
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: __("*✅ Test réussi*")
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: __("*Site:*") + ` ${siteName}`
              },
              {
                type: "mrkdwn",
                text: __("*Test:*") + ` ${testName}`
              },
              {
                type: "mrkdwn",
                text: __("*Durée:*") + ` ${duration}ms`
              }
            ]
          }
        ]
      };

      await this.client.chat.postMessage(message);
    } catch (slackError) {
      console.error(__("❌ Erreur lors de l'envoi de la notification de succès:"), slackError);
    }
  }
}

module.exports = SlackNotifier;
