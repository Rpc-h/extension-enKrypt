import RPChSDK, { JRPC, type Ops } from "@rpch/sdk";
import { JSONRPCParams } from "json-rpc-2.0";

export class RPChClient {
  sdk: RPChSDK;

  constructor(provider: string) {
    const ops: Ops = {
      discoveryPlatformEndpoint: process.env.DISCOVERY_PLATFORM_API_ENDPOINT,
      provider,
    };

    // TODO: Remove after confirmation and testing
    console.log("RPCh: CREATING SDK INSTANCE with OPS ", ops);
    console.log("RPCh: Client ID ", process.env.RPCH_SECRET_TOKEN);

    this.sdk = new RPChSDK(process.env.RPCH_SECRET_TOKEN, ops);
  }

  request(method: string, params: JSONRPCParams): Promise<unknown> {
    // TODO: Remove after confirmation and testing
    console.log(
      "RPCh: SENDING REQUEST to: ",
      (this.sdk as any & RPChSDK).ops.provider
    );
    console.log("RPCh: SENDING REQUEST method: ", method, " params: ", params);

    return this.sdk
      .send({
        jsonrpc: "2.0",
        method,
        params,
      })
      .then((res) => res.json())
      .then(({ result }: JRPC.Result) => result);
  }
}