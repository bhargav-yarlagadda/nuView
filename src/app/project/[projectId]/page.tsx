import { ProjectView } from "@/modules/projects/UI/views/project-view";
import { getQueryClient, trpc } from "@/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}
const Page = async ({ params }: Props) => {
  const { projectId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.messages.getMessages.queryOptions({
      projectId: projectId,
    })
  );
  void queryClient.prefetchQuery(
    trpc.projects.getOneProject.queryOptions({
      id: projectId,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectView projectId={projectId} />
    </HydrationBoundary>
  );
};
export default Page;
