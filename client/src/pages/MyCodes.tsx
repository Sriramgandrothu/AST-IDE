import CodeItem from "@/components/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api";
import { Link } from "react-router-dom";


export default function MyCodes() {
  const { data: myCodes } = useGetMyCodesQuery();

  return myCodes?.length !== 0 ? (
    <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {myCodes?.map((item) => (
        <CodeItem deleteBtn={true} key={item._id} data={item} />
      ))}
    </div>
  ) : (
    <div className="text-center font-mono text-slate-600 p-3">
      <p>
        No Saved Codes Yet, <Link to="/compiler">Start Coding Champ!!</Link>
      </p>
    </div>
  );
}

