import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Phone } from "lucide-react";

interface CaregiverInfo {
  caregiver_name: string;
  phone_number: string;
  senior_notes: string | null;
}

const CaregiverContact = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();
  const [caregiverInfo, setCaregiverInfo] = useState<CaregiverInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCaregiverInfo = async () => {
      if (!shortId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('caregiver_info')
          .select('caregiver_name, phone_number, senior_notes')
          .eq('short_id', shortId)
          .single();

        if (fetchError || !data) {
          setError(true);
        } else {
          setCaregiverInfo(data);
        }
      } catch (err) {
        console.error('Error fetching caregiver info:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiverInfo();
  }, [shortId]);

  const handleCall = () => {
    if (caregiverInfo) {
      window.location.href = `tel:${caregiverInfo.phone_number}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-12 flex items-center justify-center">
        <Card className="p-senior-xl text-center">
          <p className="text-senior-lg text-muted-foreground">로딩 중...</p>
        </Card>
      </div>
    );
  }

  if (error || !caregiverInfo) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-12 flex items-center justify-center">
        <Card className="p-senior-xl text-center">
          <h2 className="text-senior-xl font-semibold text-destructive mb-4">
            정보를 찾을 수 없습니다
          </h2>
          <p className="text-senior-base text-muted-foreground mb-6">
            유효하지 않은 QR코드입니다
          </p>
          <Button variant="senior-primary" onClick={() => navigate('/')}>
            홈으로 가기
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-senior-xl">
          <h1 className="text-senior-3xl font-bold text-primary mb-4">
            🆘 보호자 연락처
          </h1>
          <p className="text-senior-lg text-muted-foreground">
            길을 잃은 어르신을 발견하셨군요
          </p>
        </div>

        {/* 보호자 정보 카드 */}
        <Card className="p-senior-xl mb-senior-lg">
          <div className="text-center mb-senior">
            <h2 className="text-senior-2xl font-semibold text-foreground mb-2">
              보호자 정보
            </h2>
          </div>

          <div className="bg-accent p-senior rounded-lg mb-senior">
            <div className="space-y-4">
              <div>
                <p className="text-senior-sm text-muted-foreground mb-1">보호자 이름</p>
                <p className="text-senior-xl font-semibold text-accent-foreground">
                  {caregiverInfo.caregiver_name}
                </p>
              </div>
              <div>
                <p className="text-senior-sm text-muted-foreground mb-1">연락처</p>
                <p className="text-senior-2xl font-bold text-primary">
                  {caregiverInfo.phone_number}
                </p>
              </div>
              {caregiverInfo.senior_notes && (
                <div>
                  <p className="text-senior-sm text-muted-foreground mb-1">참고사항</p>
                  <p className="text-senior-base text-accent-foreground">
                    {caregiverInfo.senior_notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 전화 걸기 버튼 */}
          <Button 
            variant="senior-primary" 
            size="senior"
            onClick={handleCall}
            className="w-full text-senior-xl"
          >
            <Phone className="mr-2 h-8 w-8" />
            전화 걸기
          </Button>
        </Card>

        {/* 안내 메시지 */}
        <Card className="p-senior bg-primary/5 border-primary/20">
          <h3 className="text-senior-xl font-semibold text-primary mb-4">
            💡 도움 주셔서 감사합니다
          </h3>
          <div className="text-senior-base text-primary/80 space-y-3">
            <p>위 연락처로 전화하시면 보호자와 연결됩니다</p>
            <p>어르신이 안전하게 집으로 돌아갈 수 있도록 도와주세요</p>
          </div>
        </Card>

        {/* 하단 버튼 */}
        <div className="mt-senior-xl text-center">
          <Button 
            variant="senior-ghost" 
            onClick={() => navigate('/')}
            className="border-2 border-border"
          >
            홈으로 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaregiverContact;
