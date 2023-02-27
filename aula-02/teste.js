const PAYLOADS = {
    formDagView: context => {
      return {
        "type": "modal",
        "submit": {
          "type": "plain_text",
          "text": "Submit",
          "emoji": true
        },
        "close": {
          "type": "plain_text",
          "text": "Cancel",
          "emoji": true
        },
        "title": {
          "type": "plain_text",
          "text": "Mudar nome do form",
          "emoji": true
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "plain_text",
              "text": ":wave: Hey David!\n\nWe'd love to hear from you how we can make this place the best place you’ve ever worked.",
              "emoji": true
            }
          },
          {
            "type": "input",
            "element": {
              "type": "multi_users_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Select users",
                "emoji": true
              },
              "action_id": "multi_users_select-action"
            },
            "label": {
              "type": "plain_text",
              "text": "Aprovadores",
              "emoji": true
            }
          },
          {
            "type": "input",
            "label": {
              "type": "plain_text",
              "text": "What can we do to improve your experience working here?",
              "emoji": true
            },
            "element": {
              "type": "plain_text_input",
              "multiline": true
            }
          },
          {
            "type": "input",
            "label": {
              "type": "plain_text",
              "text": "Anything else you want to tell us?",
              "emoji": true
            },
            "element": {
              "type": "plain_text_input",
              "multiline": true
            },
            "optional": true
          }
        ]
      }
    }
  }

const endPointSlackApi = 'https://slack.com/api';
 
const callAPIMethodPost = async (method, payload) => {
    try {
      let result = await UrlFetchApp.fetch(`${endPointSlackApi}/${method}`, {
        method : 'post',
        contentType: 'application/json',
        payload : JSON.stringify(payload),
        headers: { Authorization: "Bearer " + SLACK_ACCESS_TOKEN }
      });
      let logJson = {
        "logErros": JSON.stringify(payload)
      };
      let optionsPost = {
        method: 'POST',
        contentType: 'application/json',
        payload: JSON.stringify(logJson)
      }
      UrlFetchApp.fetch('https://hooks.slack.com/workflows/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', optionsPost);
      return result.data;
    } catch (error) {
      let logJson = {
        "logErros": error.toString()
      };
      let optionsPost = {
          method: 'POST',
          contentType: 'application/json',
          payload: JSON.stringify(logJson)
      }
      UrlFetchApp.fetch('https://hooks.slack.com/workflows/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', optionsPost);
    }
}
  
const callAPIMethodGet = async (method, payload) => {
    payload.token = process.env.SLACK_ACCESS_TOKEN
    let params = Object.keys(payload).map(key => `${key}=${payload[key]}`).join('&')
    let result = await axios.get(`${apiUrl}/${method}?${params}`);
    return result.data;
}

async function shortcuts(){
    const payload = {}; 
    payload.callback_id = "dados_";
    payload.trigger_id = "4561143631382.1526907373760.be784bfafd1c239ddae88492d18ed699";
    try {
      let result;
      if (payload.callback_id === "dados_") {
        result = await callAPIMethodPost('views.open', {
          trigger_id: payload.trigger_id,
          view: PAYLOADS.formDagView()
        });
      }
      let logJson = {
        "logErros": result
      };
      let optionsPost = {
          method: 'POST',
          muteHttpExceptions: false,
          contentType: 'application/json',
          payload: JSON.stringify(logJson)
      }
      UrlFetchApp.fetch('https://hooks.slack.com/workflows/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', optionsPost);
    } catch (error){
      let logJson = {
        "logErros": error.toString()
      };
      let optionsPost = {
          method: 'POST',
          muteHttpExceptions: false,
          contentType: 'application/json',
          payload: JSON.stringify(logJson)
      }
      UrlFetchApp.fetch('https://hooks.slack.com/workflows/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', optionsPost);
    }
    // acknowledge the request
    return ack("");
  }

  shortcuts();
