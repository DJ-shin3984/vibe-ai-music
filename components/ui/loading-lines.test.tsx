import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import LoadingLines from "@/components/ui/loading-lines";

describe("LoadingLines", () => {
  it("renders with default text and aria-label", () => {
    const { container } = render(<LoadingLines />);
    const status = within(container).getByRole("status", { name: "Creating..." });
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-busy", "true");
  });

  it("renders custom text and splits into letters", () => {
    const { container } = render(<LoadingLines text="로딩 중…" />);
    const status = within(container).getByRole("status");
    expect(status).toHaveAttribute("aria-label", "Creating...");
    expect(container.textContent).toContain("로");
    expect(container.textContent).toContain("딩");
  });

  it("uses custom aria-label when provided", () => {
    const { container } = render(<LoadingLines text="Wait" aria-label="로딩 중" />);
    const status = within(container).getByRole("status", { name: "로딩 중" });
    expect(status).toBeInTheDocument();
  });

  it("applies custom className to container", () => {
    const { container } = render(<LoadingLines className="my-custom-class" />);
    const wrapper = container.querySelector(".my-custom-class");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders empty text without throwing", () => {
    const { container } = render(<LoadingLines text="" />);
    expect(within(container).getByRole("status")).toBeInTheDocument();
  });
});
