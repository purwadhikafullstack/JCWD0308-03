// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export class UserReview {
//     async SubmitReview(req: Request, res: Response) {
//         const { propertyId, userId } = req.body;
//         try {
//             const review = await prisma.review.create({
//                 data: {
//                     userId,
//                     propertyId,
//                 }
//             })
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
// }