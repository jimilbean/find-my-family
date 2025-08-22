import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-senior-xl">
          <h1 className="text-senior-3xl font-bold text-foreground mb-4">
            치매 어르신 실종 예방
          </h1>
          <p className="text-senior-lg text-muted-foreground">
            안전한 귀가를 위한 스마트 QR 시스템
          </p>
        </div>

        {/* 메인 선택 카드 */}
        <div className="grid gap-senior-lg md:grid-cols-2">
          {/* 보호자용 카드 */}
          <Card className="p-senior-xl text-center border-2 hover:border-primary transition-colors">
            <div className="mb-senior">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-senior-xl">👨‍👩‍👧‍👦</span>
              </div>
              <h2 className="text-senior-2xl font-semibold text-foreground mb-4">
                보호자
              </h2>
              <p className="text-senior-base text-muted-foreground mb-senior">
                어르신용 QR코드를 만들고<br />
                관리할 수 있습니다
              </p>
            </div>
            <Button 
              variant="senior-primary" 
              size="senior" 
              onClick={() => navigate('/caregiver')}
              className="w-full"
            >
              보호자 시작하기
            </Button>
          </Card>

          {/* 발견자용 카드 */}
          <Card className="p-senior-xl text-center border-2 hover:border-primary transition-colors">
            <div className="mb-senior">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-senior-xl">📱</span>
              </div>
              <h2 className="text-senior-2xl font-semibold text-foreground mb-4">
                발견자
              </h2>
              <p className="text-senior-base text-muted-foreground mb-senior">
                QR코드를 스캔하여<br />
                보호자에게 연락할 수 있습니다
              </p>
            </div>
            <Button 
              variant="senior-secondary" 
              size="senior" 
              onClick={() => navigate('/scan')}
              className="w-full"
            >
              QR코드 스캔하기
            </Button>
          </Card>
        </div>

        {/* 하단 정보 */}
        <div className="mt-senior-xl text-center">
          <p className="text-senior-sm text-muted-foreground">
            치매 어르신의 안전한 귀가를 돕는 서비스입니다<br />
            개인정보는 안전하게 보호됩니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;