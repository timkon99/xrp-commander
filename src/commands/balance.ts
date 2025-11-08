import { Command } from "../command";
import RippleAPI from "ripple-lib";

export default class Balance extends Command {
  static description = "Check XRP balance of an address";

  static args = [
    {
      name: "address",
      required: true,
      description: "XRP address to query",
    },
  ];

  async run() {
    const { args, env } = this;
    const address = args.address;
    const server = env.XRP_SERVER || "wss://s1.ripple.com:443";

    const api = new RippleAPI({ server });

    try {
      await api.connect();
      const info = await api.getAccountInfo(address);
      console.log(`✅ Balance for ${address}: ${info.xrpBalance} XRP`);
      await api.disconnect();
    } catch (err) {
      console.error(`❌ Error fetching balance: ${err.message}`);
    }
  }
}
