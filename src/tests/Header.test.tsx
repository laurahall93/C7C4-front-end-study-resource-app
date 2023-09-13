import { Header } from "../components/Header";
import { render, screen } from "../testUtils/testUtils";

describe("Header", async () => {
    test("Should have text Study Resource App", () => {
        render(<Header />);
        const elem = screen.getByText("Study Resource App");
        expect(elem).toBeInTheDocument();
    });
});
