import React from "react";
import { render, screen } from "@testing-library/react";
import { FeelingEnum, FeelingColorMap } from "types/sleepInfoCard.types";
import { FeelingCounter } from "../feelingCounter";

describe("FeelingCounter", () => {
  Object.values(FeelingEnum).forEach((feeling, index) => {
    if (typeof feeling === "number") {
      return;
    }

    test(`renders the feeling "${feeling}" with correct color and count`, () => {
      const feelingKey = index + 1;
      const count = 5;

      render(<FeelingCounter feeling={feelingKey} count={count} />);

      const feelingText = screen.getByText(feeling);
      expect(feelingText).toBeInTheDocument();
      expect(feelingText).toHaveStyle(`color: ${FeelingColorMap[feelingKey]}`);

      const countText = screen.getByText(count.toString());
      expect(countText).toBeInTheDocument();

      expect(countText).toHaveStyle(`color: ${FeelingColorMap[feelingKey]}`);
    });
  });
});
