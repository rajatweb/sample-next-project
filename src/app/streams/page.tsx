

'use server';

import dynamic from "next/dynamic";

const StreamsComponent = dynamic(() => import("@/components/Streams"), {
  ssr: false,
});


export default async function Page() {

  return (
    <div className="flex min-h-screen flex-col">
      <StreamsComponent/>
    </div>
  )
}