import { Badge } from "@/components/ui/badge"

type TagsProps = {
    tags: string[];
}



export const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
                <Badge
                    key={tag}
                    variant='secondary'
                    className="text-xs font-[400]"
                >
                    {tag}
                </Badge>
            ))}
        </div>
    )
}