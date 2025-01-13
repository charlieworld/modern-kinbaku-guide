import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Oooops 發生錯誤" },
    { name: "description", content: "BDSM 行事曆" },
  ];
};

export default function FiveHundred() {
  return (
    <main className="flex justify-center items-center pt-40">
      哇發生錯誤了...
    </main>
  );
}