import express, {
  type NextFunction,
  type Request,
  type Response,
  type Router,
} from "express";

export function createServer(userRoutes: Router) {
  const app = express();
  app.use(express.json());

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/users", userRoutes);

  // eslint-disable-next-line
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("[Error in application]", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}
