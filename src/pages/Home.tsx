import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { QrCode, Phone, Shield, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-senior-xl">
          <h1 className="text-senior-4xl font-bold text-primary mb-4">
            치매 어르신 안전 지킴이
          </h1>
          <p className="text-senior-xl text-muted-foreground mb-senior-lg">
            QR 코드를 통해 실종 위험을 줄이고, 발견 시 신속한 연락이 가능한 안전 서비스입니다
          </p>
        </div>

        {/* 메인 액션 버튼 */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 mb-senior-2xl">
          <Button 
            variant="senior-primary" 
            size="senior-lg" 
            onClick={() => navigate('/caregiver')}
            className="h-auto py-senior-xl px-senior-lg"
          >
            <div className="text-center">
              <div className="text-senior-xl font-semibold">보호자 등록하기</div>
              <div className="text-senior-sm opacity-90 mt-1">QR코드 생성하기</div>
            </div>
          </Button>
          
          <Button 
            variant="senior-secondary" 
            size="senior-lg" 
            onClick={() => navigate('/scan')}
            className="h-auto py-senior-xl px-senior-lg"
          >
            <div className="text-center">
              <div className="text-senior-xl font-semibold">QR 코드 스캔하기</div>
              <div className="text-senior-sm opacity-90 mt-1">어르신 발견 시</div>
            </div>
          </Button>
        </div>

        {/* 서비스 특징 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-senior-2xl">
          <Card className="p-senior text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-senior-lg font-semibold text-foreground mb-2">
              QR 코드 생성
            </h3>
            <p className="text-senior-sm text-muted-foreground">
              간단한 정보 입력으로 개인 맞춤 QR 코드를 만들어드립니다
            </p>
          </Card>

          <Card className="p-senior text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-senior-lg font-semibold text-foreground mb-2">
              빠른 연락
            </h3>
            <p className="text-senior-sm text-muted-foreground">
              발견 시 QR 코드 스캔으로 즉시 보호자에게 연락할 수 있습니다
            </p>
          </Card>

          <Card className="p-senior text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-senior-lg font-semibold text-foreground mb-2">
              개인정보 보호
            </h3>
            <p className="text-senior-sm text-muted-foreground">
              민감한 정보는 저장하지 않으며 안전하게 관리합니다
            </p>
          </Card>

          <Card className="p-senior text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-senior-lg font-semibold text-foreground mb-2">
              가족의 안심
            </h3>
            <p className="text-senior-sm text-muted-foreground">
              어르신의 안전과 가족의 마음의 평화를 위한 서비스입니다
            </p>
          </Card>
        </div>

        {/* 이용 방법 */}
        <Card className="p-senior-xl mb-senior-xl">
          <h2 className="text-senior-2xl font-bold text-center text-foreground mb-senior">
            이용 방법
          </h2>
          
          <div className="grid gap-senior-lg md:grid-cols-2">
            {/* 보호자용 */}
            <div>
              <h3 className="text-senior-xl font-semibold text-primary mb-4">
                보호자용
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-1">1</div>
                  <p className="text-senior-base">연락처와 간단한 메시지를 입력합니다</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-1">2</div>
                  <p className="text-senior-base">시스템이 고유 QR 코드를 생성해드립니다</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-1">3</div>
                  <p className="text-senior-base">QR 코드를 다운로드하여 출력합니다</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-1">4</div>
                  <p className="text-senior-base">옷이나 소지품에 부착합니다</p>
                </div>
              </div>
            </div>

            {/* 발견자용 */}
            <div>
              <h3 className="text-senior-xl font-semibold text-success mb-4">
                발견자용
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success text-success-foreground text-sm font-bold flex items-center justify-center mt-1">1</div>
                  <p className="text-senior-base">스마트폰으로 QR 코드를 스캔합니다</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success text-success-foreground text-sm font-bold flex items-center justify-center mt-1">2</div>
                  <p className="text-senior-base">표출된 연락처와 메시지를 확인합니다</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success text-success-foreground text-sm font-bold flex items-center justify-center mt-1">3</div>
                  <p className="text-senior-base">전화하기 버튼을 눌러 즉시 연결합니다</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success text-success-foreground text-sm font-bold flex items-center justify-center mt-1">4</div>
                  <p className="text-senior-base">필요시 현재 위치를 문자로 전송합니다</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 개인정보 보호 */}
        <Card className="p-senior bg-accent/50">
          <h3 className="text-senior-xl font-semibold text-accent-foreground text-center mb-4">
            개인정보 보호
          </h3>
          <div className="text-senior-sm text-accent-foreground text-center space-y-2">
            <p>본 서비스는 주소, 주민등록번호 등 민감한 개인정보는 저장하지 않습니다.</p>
            <p>오직 연락처와 간단한 메시지만을 안전하게 보관하며 응급 상황에서만 사용됩니다.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;