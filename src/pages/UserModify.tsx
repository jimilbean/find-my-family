import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const UserModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const existingData = location.state || {};
  
  const [formData, setFormData] = useState({
    caregiverName: existingData.caregiverName || '',
    phoneNumber: existingData.phoneNumber || '',
    seniorName: existingData.seniorName || '',
    finderMessage: existingData.finderMessage || ''
  });
  const [messageLength, setMessageLength] = useState(existingData.finderMessage?.length || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'finderMessage') {
      setMessageLength(value.length);
    }
  };

  const handleSubmit = () => {
    if (!formData.caregiverName || !formData.phoneNumber) {
      toast({
        variant: "destructive",
        title: "필수 정보 누락",
        description: "보호자 이름과 연락처를 입력해주세요.",
      });
      return;
    }

    setIsSubmitting(true);

    toast({
      title: "수정 완료!",
      description: "정보가 수정되었습니다.",
    });

    // QR 생성 페이지로 다시 이동
    navigate("/qr-generated", {
      state: {
        caregiverName: formData.caregiverName,
        phoneNumber: formData.phoneNumber,
        seniorName: formData.seniorName,
        finderMessage: formData.finderMessage,
      },
    });

    setIsSubmitting(false);
  };

  const isFormValid = formData.caregiverName && formData.phoneNumber;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-senior-xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4 p-0 h-auto text-senior-base"
          >
            ← 뒤로 가기
          </Button>
        </div>

        {/* 수정 폼 */}
        <Card className="p-senior-xl">
          <div className="mb-senior-lg">
            <h1 className="text-senior-2xl font-bold text-foreground mb-2">
              정보 수정하기
            </h1>
            <p className="text-senior-base text-muted-foreground">
              등록된 정보를 수정할 수 있습니다
            </p>
          </div>

          <div className="space-y-senior-lg">
            {/* 보호자 성함 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                보호자 성함 *
              </Label>
              <Input
                value={formData.caregiverName}
                onChange={(e) => handleInputChange('caregiverName', e.target.value)}
                placeholder="홍길동"
                className="text-senior-base p-senior"
              />
            </div>

            {/* 보호자 연락처 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                보호자 연락처 *
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  📞
                </div>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="010-1234-5678"
                  type="tel"
                  className="text-senior-base p-senior pl-12"
                />
              </div>
            </div>

            {/* 어르신 성함 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                어르신 성함 (선택사항)
              </Label>
              <Input
                value={formData.seniorName}
                onChange={(e) => handleInputChange('seniorName', e.target.value)}
                placeholder="주종준"
                className="text-senior-base p-senior"
              />
            </div>

            {/* 발견자에게 전할 메시지 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                발견자에게 전할 메시지 (선택사항)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  💬
                </div>
                <Textarea
                  value={formData.finderMessage}
                  onChange={(e) => handleInputChange('finderMessage', e.target.value)}
                  placeholder="예: 혼자 있으면 불안해하시니 다정하게 말씀해주세요"
                  rows={4}
                  maxLength={200}
                  className="text-senior-base p-senior pl-12 resize-none"
                />
              </div>
              <p className="text-senior-sm text-muted-foreground text-right">
                {messageLength}/200자
              </p>
            </div>

            {/* 개인정보 보호 안내 */}
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-senior-sm text-primary/80">
                <strong>개인정보 보호:</strong> 주소, 주민등록번호 등 민감한 정보는 입력하지 마세요. 
                입력하신 정보는 안전하게 암호화되어 저장되며, 응급상황에서만 사용됩니다.
              </p>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-senior">
              <Button 
                variant="senior-primary" 
                size="senior-lg" 
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "수정 중..." : "수정 완료"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserModify;
