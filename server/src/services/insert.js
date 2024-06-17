import db from '../models'

import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import generateCode from '../utils/generateCode';

import chothuecanho from '../../databaseFake/chothuecanho.json';
import chothuephongtro from '../../databaseFake/chothuephongtro.json';
import chothuematbang from '../../databaseFake/chothuematbang.json';
import nhachothue from '../../databaseFake/nhachothue.json';
import { DatabaseError } from 'sequelize';

const dataBody = [chothuecanho.body, chothuematbang.body, chothuephongtro.body, nhachothue.body];
const categoriesCode = ['CTCH', 'CTMB', 'CTPT', 'NCT'];


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const insertService = async () => {
    try {
        for (let i = 0; i < dataBody.length; i++) {
            const data = dataBody[i];
            const categoryCode = categoriesCode[i];

            for (const item of data) {
                let postId = uuidv4();
                let labelCode = generateCode(item.header?.class?.classType, 4);
                let attributesId = uuidv4();
                let userId = uuidv4();
                let overviewId = uuidv4();
                let imagesId = uuidv4();

                await db.Post.create({
                    id: postId,
                    title: item.header?.title,
                    star: item.header?.star,
                    labelCode,
                    address: item.header?.address,
                    attributesId,
                    categoryCode,
                    description: JSON.stringify(item.mainContent?.content),
                    userId,
                    overviewId,
                    imagesId,
                })

                await db.Attribute.create({
                    id: attributesId,
                    price: item.header?.attributes?.price,
                    acreage: item.header?.attributes?.acreage,
                    published: item.header?.attributes?.published,
                    hashtag: item.header?.attributes?.hashtag,
                })

                await db.Image.create({
                    id: imagesId,
                    image: JSON.stringify(item.images),
                })

                await db.Label.findOrCreate({
                    where: { code: labelCode },
                    defaults: {
                        code: labelCode,
                        value: item.header?.class?.classType
                    }
                })

                await db.Overview.create({
                    id: overviewId,
                    code: item.overview?.content?.find(item => item.name === 'Mã tin:')?.content,
                    area: item.overview?.content?.find(item => item.name === 'Khu vực')?.content,
                    type: item.overview?.content?.find(item => item.name === 'Loại tin rao:')?.content,
                    target: item.overview?.content?.find(item => item.name === 'Đối tượng thuê:')?.content,
                    bonus: item.overview?.content?.find(item => item.name === 'Gói tin:')?.content,
                    created: item.overview?.content?.find(item => item.name === 'Ngày đăng:')?.content,
                    expire: item.overview?.content?.find(item => item.name === 'Ngày hết hạn:')?.content,
                })

                await db.User.create({
                    id: userId,
                    fullName: item.contact?.content?.find(item => item.name === 'Liên hệ:')?.content,
                    password: hashPassword('qwe123'),
                    phone: item.contact?.content?.find(item => item.name === 'Điện thoại:')?.content,
                    zalo: item.contact?.content?.find(item => item.name === 'Zalo')?.content,
                })
            }
        }

        return {
            message: 'okee... done!'
        }
    } catch (error) {
        return { error }
    }
}