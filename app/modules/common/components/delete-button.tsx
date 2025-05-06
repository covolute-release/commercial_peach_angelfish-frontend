import { Spinner, Trash } from "@medusajs/icons";
import { cn } from "@/lib/utils";
import { useFetcher } from "@remix-run/node";

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const fetcher = useFetcher();

  const handleDelete = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    fetcher.submit(formData, {
      method: "delete",
      action: "/delete/line/item",
    });
  };

  return (
    <div className={cn("flex items-center justify-between text-small-regular", className)}>
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {fetcher.state === "submitting" ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  );
};

export default DeleteButton;
