

'use server';



import dynamic from "next/dynamic";

const PlannerComponent = dynamic(() => import("@/components/Planner"), {
  ssr: false,
});

export default async function Page() {

  return (
    <div className="flex min-h-screen flex-col">
      <PlannerComponent />
    </div>
  )
}