import { TabItem } from "@/components/ui/tabs";
import { MessageCircle, ThumbsUp } from "lucide-react";

export type ProfileTab = "posts" | "password";

export type StatisticTab = "like" | "comment";

export const StaticTabItem : TabItem<StatisticTab>[]= [
  { key: "like", label: "Like", icon: ThumbsUp  },
  { key: "comment", label: "Comment", icon: MessageCircle },
];