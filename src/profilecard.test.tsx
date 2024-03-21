// src/__tests__/IncreaseButton.test.jsx
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProfileButton } from "./sidebar/ui/ProfileButton";
import { FeedSkeleton } from "./shared/components/feedskeleton";
import BtnLoader from "./ui/btnloader";

describe("ProfileButton", () => {
  test("renders", () => {
    render(<ProfileButton />);
    expect(screen.getByText("My Profile")).toBeDefined();
  });
});

describe("FeedSkeleton", () => {
  test("renders skeleton elements", () => {
    render(<FeedSkeleton />);

    // Check if the skeleton elements are present in the DOM
    expect(screen.getByTestId("skeleton-card")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-text")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-image")).toBeInTheDocument();
  });
});

describe("BtnLoader", () => {
  test("renders with default values", () => {
    render(<BtnLoader />);

    // Check if the default label and icon are rendered
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
  });

  test("renders with provided label and icon", () => {
    render(<BtnLoader label="Custom Label" icon="custom-icon" />);

    // Check if the provided label and icon are rendered
    expect(screen.getByText("Custom Label ...")).toBeInTheDocument();
  });
});
