import axios from 'axios'
import sharp from 'sharp'

const WIDTH = 500

// Resizes images on the fly using streams

export const GET = async ({ params }: { params: { src: string } }) => {
	const imageResponse = await axios({ url: params.src, responseType: 'arraybuffer' })
	const buffer = Buffer.from(imageResponse.data, 'binary')
	const resized = await sharp(buffer).resize({ width: WIDTH }).toBuffer()

	return {
		body: resized,
	}
}
