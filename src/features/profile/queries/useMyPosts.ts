import { useQuery } from "@tanstack/react-query";

import { profileKeys } from "@/features/profile/queries/profile-keys";
import { getMyPosts } from "@/features/profile/api";
import { MyPostsParams } from "@/features/profile/types";


export const useMyPosts = (params: MyPostsParams) => {
  return useQuery({
    queryKey: profileKeys.myPosts(params),
    queryFn: () => getMyPosts(params),
  });
};
