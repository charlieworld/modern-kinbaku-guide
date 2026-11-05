import { readFileSync } from "node:fs";
import path from "node:path";

export type DonationEntry = {
  createdAt?: string;
  name?: string;
  comment?: string;
};

export type DonationPayload = {
  totalAmount: number;
  donner: number;
  data: DonationEntry[];
};

export function readDonations(): DonationPayload {
  const file = path.join(process.cwd(), "app/data/donations.json");
  try {
    return JSON.parse(readFileSync(file, "utf8")) as DonationPayload;
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    throw new Error(
      `Could not read app/data/donations.json (${message}). Run yarn build with GOOGLE_CREDENTIALS or a gitignored credentials.json.`
    );
  }
}
