'use server';



import dynamic from "next/dynamic";

const TeamsComponent = dynamic(() => import("@/components/Teams"), {
  ssr: false,
});

export default async function Page() {

  return (
    <div className="flex min-h-screen flex-col">
      <TeamsComponent />
    </div>
  )
}