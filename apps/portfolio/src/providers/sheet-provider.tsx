import { getInfo } from "@/features/profile/lib/get-info";
import { MainSidebar } from "@/features/sidebar/components/main-sidebar";

const SheetProvider = () => {
  const info = getInfo();
  return (
    <>
      <MainSidebar data={info} />
    </>
  );
};

export default SheetProvider;
