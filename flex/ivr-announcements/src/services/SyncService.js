import * as Flex from "@twilio/flex-ui";
import { SyncClient } from "twilio-sync";

const SYNC_TOKEN_URL = process.env.FLEX_APP_SYNC_TOKEN_URL;
const SYNC_DOC_NAME = process.env.FLEX_APP_SYNC_DOC_NAME;

class SyncService {
  constructor() {
    this.token_url = SYNC_TOKEN_URL;
    this.document_name = SYNC_DOC_NAME;
    this.manager = Flex.Manager.getInstance();
    this.client = null;
  }

  async getToken() {
    const body = {
      Token: this.manager.store.getState().flex.session.ssoTokenPayload.token,
    };

    const options = {
      method: "POST",
      body: new URLSearchParams(body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    };

    try {
      const resp = await fetch(this.token_url, options);
      const result = await resp.json();

      return result.token;
    } catch (e) {
      console.log(`Error making request: ${e}} `);
    }

    return false;
  }

  async getSyncClient() {
    const token = await this.getToken();

    if (token) {
      this.client = new SyncClient(token);
    }
  }

  async getDocument() {
    if (this.client === null) {
      await this.getSyncClient();
    }

    if (!this.client) {
      return false;
    }

    const document = await this.client.document(this.document_name);

    return document;
  }

  async updateDocument(message) {
    const document = await this.getDocument();

    if (!document) {
      return false;
    }

    document.data.announcement = message;
    const data = await document.update(document.data);

    return data;
  }
}

export default new SyncService();
