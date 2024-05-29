import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";
import { createblogInput,updateblogInput } from "@mediumapp/medium-common";
import { number } from "zod";
export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

bookRouter.use('/*',async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
	const user = await verify(authHeader, c.env.JWT_SECRET);
	if(user) {
		c.set("userId",String(user.id))
		await next();
	}else {
		c.status(403)
		return c.json({
			message: "You are not logged in"
		})
	}
});

bookRouter.post('/', async (c) => {
	const body = await c.req.json();
	const {success} = createblogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Invalid Inputs"
      })
    }
	const authorId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: authorId
		}
	});
	return c.json({
		id: post.id
	});
})

bookRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const {success} = updateblogInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Invalid Inputs"
      })
    }
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

bookRouter.get('/bulk',async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	try {
		const blogs = await prisma.post.findMany({
			select: {
				content: true,
				title: true,
				id: true,
				author: {
					select: {
						name: true
					}
				}
			}
		});
		return c.json({
			blogs
		})
	}catch(e) {
		console.error("Error while fetching the block",e)
		c.status(403)
		return c.json({
			e:"Internal Server Error"
		})
	}
});

bookRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id: id
		},
		select: {
			id: true,
			title: true,
			content: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json(post);
})

