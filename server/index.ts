import express, { Request, Response } from "express";
import next from "next";
import bodyParser from "body-parser";
import cors from "cors";
import loansApiHandler  from "../pages/api/loans";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

export default async function () {
	await app.prepare();
	try {
		const server = express();
		const PORT = process.env.PORT || 4000;

		server.use(cors());
		server.use(bodyParser.json());
		server.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);
		server.get("*", (req: Request, res: Response) => 
			handle(req, res)
		);
		server.get("/api/loans", (req: Request, res: Response) => {
			const actualPage = "/";
			const queryParams = {page: req.params.page, pageSize: req.params.pageSize}
			app.render(req, res, actualPage, queryParams)
	});

		server.listen(PORT, function (err?: any) {
			if (err) throw err;
			console.log("Server is running on Port:", PORT);
		});
	} catch (ex: any) {
		console.error(ex.stack);
		process.exit(1);
	}
}
