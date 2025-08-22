import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="p-senior-xl text-center max-w-md">
        <div className="mb-senior">
          <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <span className="text-senior-2xl">❓</span>
          </div>
          <h1 className="text-senior-3xl font-bold text-foreground mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-senior-lg text-muted-foreground mb-senior">
            요청하신 페이지가 존재하지 않거나<br />
            주소가 잘못되었습니다
          </p>
        </div>
        <Button 
          variant="senior-primary" 
          size="senior"
          onClick={() => window.location.href = '/'}
        >
          홈으로 돌아가기
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
