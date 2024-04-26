'use server';

import { otherClient } from "../client";
import { z } from 'zod';

export const saveUser = otherClient
    .schema(z.object({ email: z.string().min(1) }))
    .bindArgsSchemas<[userId: z.ZodString]>([z.string()])
    .action(async ({ parsedInput: user, bindArgsParsedInputs: [userId] }) => {
        console.log(userId);
        console.log(user);
    });