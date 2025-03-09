import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] bg-gray-800 text-white flex flex-col justify-center items-center text-2xl font-bold space-y-4">
      <div>404 - No Page Found</div>
      <Link to="/">
        <Button variant="link">Home</Button>
      </Link>
    </div>
  );
}
