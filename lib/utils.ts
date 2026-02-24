/**
 * Tailwind 클래스 병합 유틸 (shadcn 스타일).
 * 조건부/여러 클래스를 하나의 문자열로 합친다.
 */
export function cn(
  ...inputs: (string | undefined | null | false)[]
): string {
  return inputs.filter(Boolean).join(" ");
}
