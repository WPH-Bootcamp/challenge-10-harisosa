"use client";

import { ArticleDetail } from "@/features/articles/components";
import { useParams } from "next/navigation";
import React from "react";


const ArticleDetailPage: React.FC = () => {
    const params = useParams<{ id: string }>();
    const id = params.id;
    return <ArticleDetail id={id} />;
};

export default ArticleDetailPage;
