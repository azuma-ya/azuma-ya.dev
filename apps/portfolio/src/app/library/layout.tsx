import type { ReactNode } from "react";

import { Container } from "@repo/ui/components/layout/container";

interface Props {
  children: ReactNode;
}

const LibraryLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex flex-col">
      {children}
      <Container maxWidth="md" className="mt-auto">
        <p className="text-muted-foreground text-center text-xs">
          ※当サイトの本の表紙画像はOGP画像により提供されており、著作権法に違反していないと考えられますが、抗議を受けた場合には直ちに削除いたします。
          <a
            href="https://maeshibu.com/2019/03/28/inlinelink/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            [参考]
          </a>
        </p>
      </Container>
    </div>
  );
};

export default LibraryLayout;
