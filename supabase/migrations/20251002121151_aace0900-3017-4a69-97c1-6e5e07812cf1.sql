-- 보호자 정보를 저장할 테이블 생성
CREATE TABLE public.caregiver_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  short_id TEXT NOT NULL UNIQUE,
  caregiver_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  senior_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS 활성화 (공개 접근 가능하도록)
ALTER TABLE public.caregiver_info ENABLE ROW LEVEL SECURITY;

-- 누구나 조회 가능 (QR 스캔 시 필요)
CREATE POLICY "Anyone can view caregiver info"
ON public.caregiver_info
FOR SELECT
USING (true);

-- 누구나 삽입 가능 (QR 생성 시 필요)
CREATE POLICY "Anyone can insert caregiver info"
ON public.caregiver_info
FOR INSERT
WITH CHECK (true);

-- short_id 인덱스 생성 (빠른 조회를 위해)
CREATE INDEX idx_caregiver_info_short_id ON public.caregiver_info(short_id);

-- 짧은 ID 생성 함수
CREATE OR REPLACE FUNCTION public.generate_short_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$;