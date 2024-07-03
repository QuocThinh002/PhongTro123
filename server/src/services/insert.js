import db from '../models'

import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import generateCode from '../utils/generateCode';
import convertPrice from '../utils/convertPrice';
import convertDate from '../utils/convertDate';
import subtractRandomDate from '../utils/randomDate';

import chothuecanho from '../../databaseFake/chothuecanho.json';
import chothuephongtro from '../../databaseFake/chothuephongtro.json';
import chothuematbang from '../../databaseFake/chothuematbang.json';
import nhachothue from '../../databaseFake/nhachothue.json';

const dataBody = [chothuecanho.body, chothuematbang.body, chothuephongtro.body, nhachothue.body];
const categoriesCode = ['CTCH', 'CTMB', 'CTPT', 'NCT'];


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const insertService = async () => {
    try {
        const dataPost = []
        for (let i = 0; i < dataBody.length; i++) {
            const data = dataBody[i];
            const categoryCode = categoriesCode[i];
            let j = 0;
            for (const item of data) {
                console.log(i, j++)
                let postId = uuidv4();
                let labelId = uuidv4();
                let labelCode = generateCode(item.header?.class?.classType, 4);
                let attributesId = uuidv4();
                let userId = uuidv4();
                let overviewId = uuidv4();
                let imagesId = uuidv4();
                let price = convertPrice(item.header?.attributes?.price)


                

                await db.Attribute.create({
                    id: attributesId,
                    price,
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
                        id: labelId,
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
                    created: convertDate(item.overview?.content?.find(item => item.name === 'Ngày đăng:')?.content),
                    expire: convertDate(item.overview?.content?.find(item => item.name === 'Ngày hết hạn:')?.content),
                })

                await db.User.create({
                    id: userId,
                    fullName: item.contact?.content?.find(item => item.name === 'Liên hệ:')?.content,
                    password: hashPassword('qwe123'),
                    phone: item.contact?.content?.find(item => item.name === 'Điện thoại:')?.content,
                    zalo: item.contact?.content?.find(item => item.name === 'Zalo')?.content,
                })

                dataPost.push({
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
                    createdAt: subtractRandomDate(new Date()).newDate
                })
                
            }
        }
        // for (let postItem of dataPost) {
        //     await db.Post.create(postItem)
        // }

        return {
            message: 'okee... done!',
            dataPost,
        }
    } catch (error) {
        return { error }
    }
}

export const insertOne = async (data) => {
    try {
        // const response = await db.Post.create(data)
         data = [
            {
                "id": "93f0b8d5-532a-47c9-9e12-7b5007257254",
                "title": "Phòng Cho Nam Trong Chung Cư Cao Cấp",
                "star": "5",
                "labelCode": "9DE1",
                "address": "Địa chỉ: 57 Quốc Lộ 13, Phường 26, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "a798069d-833f-4f32-a5c5-bd67c4aa4779",
                "categoryCode": "CTCH",
                "description": "[\"Cho Nam share phòng trong căn hộ 3PN 120m2 :\",\"2 ban công, 2 wc\",\"Full NT ( Máy nước nóng, máy lạnh, giường, tủ, bếp, tủ lạnh, máy giặc cửa ngang mới, phòng khách & phòng bếp )\",\"Tầng 3 nội khu : hồ bơi, phòng gym, khu sinh hoạt cộng đồng, spa & coffee , quán ăn\",\"Tầng trệt : Siêu thị win mart , anh văn Việt Mỹ\",\"Chung cư mặt tiền, sảnh ra vào rộng rãi\",\"- có chỗ đậu oto & xe máy trên sảnh\",\"- 2 hầm xe rộng rãi\"]",
                "userId": "79dde8f6-9959-4a4b-ba66-79761a8cb177",
                "overviewId": "9b6b519b-aa17-4dfa-b838-7ef28fbb1781",
                "imagesId": "44a18a0b-ebd8-4971-872c-fb3a3a571254",
                "createdAt": "2024-06-24T06:35:26.899Z"
            },
            {
                "id": "cf83d3e3-d0c5-417f-bc06-4602d3a63090",
                "title": "Căn hộ mini khu Nguyễn Gia Trần Não trung tâm Quận 2. DT từ : 21m2 - 36m2, giá từ 4.1tr -7.6tr",
                "star": "3",
                "labelCode": "901E",
                "address": "Địa chỉ: 21 Đường số 10, Phường Bình An, Quận 2, Hồ Chí Minh",
                "attributesId": "8967da1a-3e7d-4f11-88b7-a47913efdeeb",
                "categoryCode": "CTCH",
                "description": "[\"CHO THUÊ CĂN HỘ MINI DIỆN TÍCH TỪ TỪ : 21M2 - 40M2, MỚI GIÁ TỐT TẠI TRUNG TÂM QUẬN 2- ĐƯỜNG 10 TRẦN NÃO, F BÌNH AN. Q 2; Tp . HCM\",\"GIÁ THUÊ THỪ:  4.1 Triệu/Tháng đến 7.6 Triệu/Tháng\",\"Nhà ở yên tĩnh, mới , đẹp, an ninh, kết nối thuận tiện các quận vùng lân cận như Q1, Q BÌNH THẠNH, Q3,Q1, THỦ ĐỨC , Q9…\",\"Tiện ích: Cho quý khách chọn căn hộ mini phường Bình An, Quận 2, HCM.\",\"Chọn nhà ở ngay gần đường Trần Não Trung Tâm Quận 2; Tp. HCM là quý khách sở hữu nhiều tiện ích như:\",\"- Gần công viên thuận tiện cho việc rèn luyện sức khỏe và thư giãn hàng ngày\",\"- Gần chợ, siêu thị, TT thương mai, chợ, quán cà phê , nhà hàng…\",\"- Gần bệnh viện , TT y tế, phòng khám…\",\"- Gần trường học, công, tư thục, quốc tế, trường năng kiếu ; trường Đại Học …\",\"- Gần các trung tâm ngoại ngữ; Ngân Hàng; Phòng Công chứng …\",\"Nhà thuê ở đường 10 phường Bình An mới 100%, khu nhà ở thoáng mát hành lang rộng chuẩn với 1 thang máy, 1 thang bộ, hệ thống PCCC, camera an ninh,kiểm soát kĩ cửa ra vào mỗi phòng,có bảo vệ giữ xe,có máy giặt ,phòng rộng có cửa sổ thông, thoáng mát,có chỗ phơi đồ riêng mỗi phòng, có bếp, có bồn rửa chén, phòng tắm rộng đầy đủ tiện nghi, wifi miễn phí.\",\"Quý khách sẽ hài lòng khi chọn thuê nhà an cư tại trung tâm Quận 2 Tp. HCM.\",\"Liên hệ xem nhà hoặc cần thêm thông tin vui lòng gọi số: 093 116 22 55\"]",
                "userId": "129ebe1c-e9ce-40c9-84bb-26210f13f277",
                "overviewId": "38b1037c-74d6-4b10-bffc-d8d3cfcef63c",
                "imagesId": "89c0d0c6-6ad6-4a95-a88d-f5c5d0563909",
                "createdAt": "2024-06-29T01:01:28.023Z"
            },
            {
                "id": "52eb7767-4571-4c37-92e8-ad3741a101a0",
                "title": "Phòng FULL Nội Thất cao cấp Ngay Sân bay TSN, Rộng rãi, An ninh, GIá rẻ",
                "star": "2",
                "labelCode": "91E0",
                "address": "Địa chỉ: 2/26 Đường Bạch Đằng, Phường 2, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "742aa9cf-f640-44bd-8b52-5764c8f4071e",
                "categoryCode": "CTCH",
                "description": "[\"Phòng cao cấp full nội thất, sang trọng phù hợp với người đi làm, cặp vợ chồng son.\",\"Ngay Gần Sân Bay Tân Sơn Nhất, Công viên Gia định,…\",\"Liên hệ NGAY để xem phòng: 0931610338\",\"Nội thất: - Một giường lớn, 1 tủ đồ, 1 tủ lạnh, máy lạnh, tivi, 1 bộ bàn ghế, bếp,...\",\"Phòng thật như hình\",\"Tiện nghi hàng đầu:\",\"+ Cửa bảo mật vân tay và mật khẩu An ninh\",\"+ Wifi internet đầy đủ\",\"+ Free xe\",\"+ Có nhà vệ sinh riêng,...\",\"+ Giờ tự do,\",\"+ Phòng trên lầu nên đi thang bộ, phù hợp với người muốn nâng cao sức khỏe, thích rèn luyện thể lực\",\"+ Không phù hợp với người không thích đi thang bộ\",\"Giá thuê: 4tr5\",\"Địa chỉ: 2/26 Bạch đằng, quận Tân Bình, Tp.HCM – Ngay Gần Sân Bay Tân Sơn Nhất, Công viên Gia định,…\",\"Liên hệ NGAY để xem phòng: 0931610338\"]",
                "userId": "d7ab5d91-90fe-4bf0-804e-eaef9b1b2eda",
                "overviewId": "dddd892f-a15c-4cec-9d6e-1058badd9cf0",
                "imagesId": "8c714515-b2fe-45bf-9270-000626dfd428",
                "createdAt": "2024-06-26T06:09:29.049Z"
            },
            {
                "id": "5b98f3a0-32f1-4139-9425-6153679fa875",
                "title": "Khai Trương Từng Bừng CHDV Mới",
                "star": "2",
                "labelCode": "8F86",
                "address": "Địa chỉ: Nguyễn Văn Săng, Phường Tân Sơn Nhì, Quận Tân Phú, Hồ Chí Minh",
                "attributesId": "f45cc5c8-8721-40d2-b826-dd66b5fdc7cc",
                "categoryCode": "CTCH",
                "description": "[\"* Tưng Bừng Khai Trương CHDV Mới *\",\"- Địa Chỉ: Nguyễn Văn Săng, Phường Tân Sơn Nhì, Phú Nhuận\",\"- Thích hợp ở gia đình, Kinh doanh onl,...\",\"- Phòng có ban công lớn, và cửa sổ thoáng mát\",\"- 3 loại phòng studio, 1pn1pk , 2pn 1pk\",\"- Giá : 2pn ban công ngoài , -8tr\",\"2pn ban công trong 7tr5\",\"1pn ban công ngoài 6tr5\",\"1pn ban công trong 6tr\",\"- Có 1 máy lạnh, thêm ml thêm 500k\",\"Lh/Zalo: 0937475715 hoặc ib để được tư vấn hỗ trợ xem phòng trực tiếp\"]",
                "userId": "06d2784b-08d3-4c09-8c02-4708b8cbf12f",
                "overviewId": "871a6769-15a1-4767-84f0-2aa776c72d39",
                "imagesId": "bdaf4851-8b41-439a-978c-4a94c1fa0a7e",
                "createdAt": "2024-06-29T06:58:30.315Z"
            },
            {
                "id": "dd64b077-67b4-4699-aae7-185f20d21695",
                "title": "Cho Thuê CHDV 1pn 1pk và 2pn Phòng mới",
                "star": "2",
                "labelCode": "EFCD",
                "address": "Địa chỉ: 241 Đường số 20, Phường 5, Quận Gò Vấp, Hồ Chí Minh",
                "attributesId": "c5e4c26a-ee0e-4c73-86a2-48af704eda36",
                "categoryCode": "CTCH",
                "description": "[\"Cho Thuê CHDV mới\",\"Địa chỉ: 241 Đường Số 20 P5 GV\",\"- Có 2 dạng phòng:\",\"+ 1pn 1pk\",\"+ 2pn 1pk\",\"- Nội thất: Như Hình\",\"- Điện: 3k5\",\"- Nước: 100k/Ng\",\"- Wifi: 100k/P\",\"Còn lại free\",\"Lh: hoặc ib zalo để được tư vấn hỗ trợ xem p trực tiếp\"]",
                "userId": "a37b2c96-9992-45d0-97dc-38c4de78975b",
                "overviewId": "589edac8-0b2e-4b9c-be93-9c8b6277140b",
                "imagesId": "f6189d5a-5a0c-48be-a1a7-6fb76f075915",
                "createdAt": "2024-06-29T11:23:31.377Z"
            },
            {
                "id": "96799ef6-118a-4ee2-a80a-5066b944d12a",
                "title": "Cho Thuê CHDV An Ninh Cao Có quản lí trực cả ngày",
                "star": "2",
                "labelCode": "C91F",
                "address": "Địa chỉ: 702 Đường Xô Viết Nghệ Tĩnh, Phường 25, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "d4de245d-a37e-4c1d-a3dc-c35e08459a8e",
                "categoryCode": "CTCH",
                "description": "[\"Địa chỉ: 702 xvnt - p25- Bình Thạnh\",\"Giá:3tr5\",\"- Phòng trống ( có máy lạnh) , giới hạn giờ (12h) nếu về quá giờ gọi qli\",\"- Cọc 1\",\"Phí khác:\",\"- Điện 3k5, nước 100k/ người , xe số 100k/c tay ga 200k/C, dịch vụ: 130k\",\"Lh: 0937475715 hoặc ib zalo để được tư vấn hỗ trợ xem phòng trực tiếp\"]",
                "userId": "ca1c8327-befe-4948-952b-aee3ae8257b5",
                "overviewId": "49ef7395-798d-4876-b5a9-442f5c5bf1c9",
                "imagesId": "c6336d35-3813-433f-9a6e-197de60329e8",
                "createdAt": "2024-06-26T12:11:32.262Z"
            },
            {
                "id": "229edbee-9e89-4113-9e5f-240b11d8e2f3",
                "title": "Cho thuê Căn hộ view sông SG nằm trong khu biệt thự Bình Lợi",
                "star": "2",
                "labelCode": "9DE1",
                "address": "Địa chỉ: Đường Bình Lợi, Phường 13, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "cdc5b7dc-d7d2-4ca7-abe3-64c0cc3a494d",
                "categoryCode": "CTCH",
                "description": "[\"CĂN HỘ NẰM TRONG KHU BIỆT THỰ BÌNH LỢI GIÁ CỰC HẤP DẪN\",\"Vị trí: Binh Lợi, Phường 13, Bình Thạnh\",\"Căn hộ view sông đón gió trời cực kỳ thoáng mát\",\"Mới Xây 100%\",\"Diện tích từ 30-60m2\",\"Có hầm xe rộng\",\"Thang máy hiện đại\",\"View sông Sài Gòn cực chill\",\"Giá hấp dẫn cho một căn hộ khu biệt thự chỉ từ 8tr8, 9tr3, 9tr8, 10tr, 10tr5, 11tr\"]",
                "userId": "5de4eea1-beb0-4ef5-af32-98a5a3bac8f8",
                "overviewId": "5c7ccaf7-71ec-467a-99ee-f32e15b55c63",
                "imagesId": "9256a039-125b-486c-bd3a-96d79ded38fe",
                "createdAt": "2024-06-26T20:22:33.086Z"
            },
            {
                "id": "7f837b69-a04a-4355-aaab-de1c1e3aa5e3",
                "title": "CHDV 1PN đối diện ETOWN có bancol mát mẻ",
                "star": "2",
                "labelCode": "91E0",
                "address": "Địa chỉ: Đường Nhất Chi Mai, Phường 13, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "bb40c961-39e7-47ea-86e4-df9ac9e8a9eb",
                "categoryCode": "CTCH",
                "description": "[\"Địa chỉ: Đường Nhất Chi Mai, P13, Tân Bình\",\"Điện 3.5k\",\"Nước 100k người\",\"Xe 100k người\",\"Phí dịch vụ 50k người gồm rác wifi\",\"FULL NỘI THẤT\"]",
                "userId": "86c33bcb-41a0-444e-8de3-61f71a023586",
                "overviewId": "50e6c6c0-0ade-463a-a6b0-6ab477b21599",
                "imagesId": "b6e2ca06-798d-44b0-ae61-fea9e5a89f97",
                "createdAt": "2024-06-26T18:04:34.059Z"
            },
            {
                "id": "472e18a6-a7dc-41f1-a933-e578284ef0df",
                "title": "Căn Hộ Duplex ban công ngay KCX , Phú Mỹ Hưng và các trường ĐH Q7",
                "star": "2",
                "labelCode": "405A",
                "address": "Địa chỉ: Đường Trần Trọng Cung, Phường Tân Thuận Đông, Quận 7, Hồ Chí Minh",
                "attributesId": "f0d72a07-825c-479a-8f37-ec6ee3fe8d3e",
                "categoryCode": "CTCH",
                "description": "[\"Căn hộ dịch vụ mới xây, Có ban công, full nội thất, có bếp, cửa sổ ban công, ngay sát bên Vincom Nam Long, khu trung tâm Quận 7, cách Phú Mỹ Hưng 3 km. Giá thuê chỉ từ 5.8 tr/tháng.\",\"1. Vị trí thuận tiện:\",\"- Địa chỉ : Đường Trần Trọng Cũng ngay khu dân cư Nam Long.\",\"- Đường rộng 2 ô tô đi được.\",\"- Sát bên Vincom Nam Long (đường Trần Trọng CUng).\",\"- Mất 5 phút để ra các trục đường lớn: Trần Trọng cung, Huỳnh Tấn Phát, Lý Phục Man, Nguyễn Thị Thập, Nguyễn Văn Linh, cầu Phú Mỹ.\",\"- Gần trường ĐH Tôn Đức Thắng, trường ĐH Nguyễn Tất Thành, trường trung cấp kinh tế - kỹ thuật, nhà hàng tiệc cưới Duyên Hải.\",\"- Tiện ích mua sắm đầy đủ, gì cũng có.\",\"2. Tiện ích.\",\"- Nội thất đầy đủ 100%, có bếp.\",\"- Có tủ áo quần bằng gỗ sang trọng.\",\"- Tivi truyền hình cáp nhiều kênh, wifi cực mạnh.\",\"- Máy lạnh tiết kiệm điện, mới 100%.\",\"- Có máy giặt, máy sấy đầy đủ.\",\"- Hầm để xe sạch sẽ và rộng rãi.\",\"- Toilet rộng rãi, sạch sẽ, sang trọng.\",\"3. An ninh:\",\"+ Nhà được giám sát bằng hệ thống camera 24/24.\",\"+ Nằm trong khu quân đội, các cơ quan nhà nước nên rất an ninh.\",\"+ Ở chung với người có trí thức, ý thức cao.\",\"4. Giá phòng.\",\"- 5,8 tr/ tháng.\",\"- Điện 3.5 nghìn/kwh.\",\"- Nước: 25 nghìn / m3\",\"- Phí quản lý: 150k / phòng\",\"- Máy giặt + sấy 100 nghìn/người.\",\"* Gọi ngay: 0583.165.215 (Hà Phiếu ) để xem phòng nha các bạn.\"]",
                "userId": "bd514de3-05f8-41df-8e4b-af1dcd681f55",
                "overviewId": "b6f1b9fe-0531-4769-94b0-242313e48f8c",
                "imagesId": "19963248-1765-4f68-8158-49f32e57750e",
                "createdAt": "2024-06-27T02:03:35.091Z"
            },
            {
                "id": "e2d5d2b9-515e-4fef-b30a-c593d6d2d61b",
                "title": "Căn Hộ Full Nội Thất Gần ĐH TDTU - RMIT - UFM",
                "labelCode": "2BBD",
                "address": "Địa chỉ: Đường Nguyễn Thị Thập, Phường Tân Hưng, Quận 7, Hồ Chí Minh",
                "attributesId": "b6288789-24db-4ebc-bc9a-43c809634bd1",
                "categoryCode": "CTCH",
                "description": "[\"CHDV Studio ̣̂ ̂́\",\"Vị trí: Ngay Lotte Mart Q7\",\"Gần đại học TDT, Tài chính - Marketing, Big C, Vincom Trần Trọng Cung, chợ, cửa hàng tiện lợi,...\",\"Căn hộ full nội thất, cửa sổ, ban công thoáng\",\"Giờ giấc tự do, không chung chủ\",\"Thang máy rộng\",\"Internet tốc độ cao\",\"Camera an ninh\",\"Giá công khai các dạng:\",\"Dạng phòng Studio Full NT: 4tr - 8tr\",\"Dạng phòng Duplex Full NT: 5tr5 - 7tr5\",\"Dạng phòng 1PN Full NT: 6tr2 - 8tr\",\"---------------------------------------\",\"Căn hộ dịch vụ, chung cư, phòng trọ cho thuê\",\"Call, Imess, Zalo...\"]",
                "userId": "da70d27a-8596-427e-8823-6a96479e879c",
                "overviewId": "946fdf94-f396-42eb-bfb4-fb7877e3a74f",
                "imagesId": "cdc42cf7-0d30-4e92-8af8-5aca7e6fd977",
                "createdAt": "2024-06-25T04:58:35.985Z"
            },
            {
                "id": "86afd187-4b9e-4ef4-8daf-57992384dfdb",
                "title": "Căn Hộ Đầy Đủ Nội Thất Cao Cấp - Thoáng Mát - Ngay Công Viên Phần Mềm Quang Trung",
                "labelCode": "271F",
                "address": "Địa chỉ: Đường Tô Ký, Phường Trung Mỹ Tây, Quận 12, Hồ Chí Minh",
                "attributesId": "0b39151c-c572-41e8-84ad-9377bc7940be",
                "categoryCode": "CTCH",
                "description": "[\"CHO THUÊ CĂN HỘ DỊCH VỤ FULL NỘI THẤT CAO CẤP TẠI QUẬN 12\",\"Trung Mỹ Tây 14A, phường Trung Mỹ Tây, quận 12\",\"5.000.000 - 5.500.000 (studio full nội thất)\",\"Nội thất bao gồm: tủ lạnh, bàn ghế, giường nệm, tivi, kệ bếp tủ bếp, tủ quần áo, máy giặt riêng, máy lạnh, bếp từ đơn/đôi (tùy phòng)\",\"Vị trí:\",\"- Gần bến xe An Sương, siêu thị, khu ăn uống, gần chợ\",\"- Hẻm thông các đường lớn, có nhiều toà nhà sát bên\",\"- Khu nhân viên văn phòng, sinh viên rất yên tĩnh, thoải mái.\",\"Căn hộ rộng, đẹp, mới, sang trọng, thông thoáng, đầy đủ tiện nghi, có các phòng ngủ bên trọng cực thoải mái.\",\"Có thang máy, wifi riêng từng phòng, nước nóng lạnh\",\"Hầm xe có bảo vệ trông coi 24/7\",\"Giờ giấc tự do, chìa khóa riêng và có thẻ từ, không chung chủ.\",\"Chi phí khác:\",\"Điện: 4000đ/kwh\",\"Nước: 100k/người\",\"Xe: 100k/xe\",\"Phí dịch vụ: 170k/phòng\",\"Liên hệ Trang: 0707.142.793 (call/zalo) để được tư vấn và hỗ trợ xem phòng trực tiếp\"]",
                "userId": "502d77ff-23aa-460b-9eaf-15582fc99dbe",
                "overviewId": "bc80f329-6c19-4c81-9972-02e8ac06574d",
                "imagesId": "cf494f48-bbd7-40be-9198-d6e00471c161",
                "createdAt": "2024-06-29T04:19:36.933Z"
            },
            {
                "id": "dfed5b8d-1a11-44e2-a8f8-340398848cc9",
                "title": "CHO THUÊ CĂN HỘ Ecolife Riverside TP. QUI NHƠN",
                "labelCode": "ACA9",
                "address": "Địa chỉ: Điện Biên Phủ, Phường Nhơn Phú, Thành Phố Quy Nhơn, Bình Định",
                "attributesId": "96003f9a-c1ef-4da5-bae7-c4a766bc4edc",
                "categoryCode": "CTCH",
                "description": "[\"Diện tích : 64m2.\",\"- Gồm 2 Phòng ngủ, 2 tolet, phòng khách , phòng bếp. Hồ bơi ở đây rất rộng.\",\"- Nội thất hoàn thiện.\",\"- View thoáng. Ban công rộng rãi.\",\"- Tiện ích xung quanh, gần chợ, trường học mầm non tầng 1\",\"- Giá cho thuê: 6.500.000đ/tháng ( Bao Phí quản lý 1 năm)\"]",
                "userId": "3a6d6427-1300-4958-987e-78ecf6f7449c",
                "overviewId": "6d638d4d-913c-4c60-9142-ae71025093d2",
                "imagesId": "1f513e5d-9457-4a8f-9294-5962081ccc3e",
                "createdAt": "2024-06-23T19:17:38.060Z"
            },
            {
                "id": "9fb13238-198b-4a67-94ef-d677d8a1e1cc",
                "title": "Phòng Tâng lửng Tân Bình full nội thất gia siêu rẻ",
                "labelCode": "164A",
                "address": "Địa chỉ: Đường Tân Hải, Phường 13, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "daf5310e-f481-412c-837e-b4b2aab0caed",
                "categoryCode": "CTCH",
                "description": "[\"Thiết kế: phòng có máy lạnh, cửa sổ mở ra giếng trời, nhà vệ sinh trong phòng, thoáng mát\",\"Nội thất: Máy lạnh, tủ lạnh, tủ áo, giường, nệm, bàn ghế, tủ bếp có bồn rửa\",\"Máy giặt dùng chung và phơi đồ trên sân thượng\",\"Không chung chủ, giờ giấc tự do, giữ xe trong nhà\",\"Điện: 4000hwh\",\"Nước : 100/ người\",\"Phí dịch vụ: 150k/ phòng\"]",
                "userId": "6e164ba8-34f2-4bc5-91d8-64484a3ecc1e",
                "overviewId": "b8a520f7-5e63-4bc9-89dc-28182059441f",
                "imagesId": "e73dd260-060f-4c7c-afe8-5cd9b1a26fc4",
                "createdAt": "2024-06-29T11:43:38.982Z"
            },
            {
                "id": "f5bc3e59-c3f4-4506-a8a2-5f5cc895c884",
                "title": "Cho Thuê Căn hộ Góc 59m2, 69m2, 81m2 khu Origami đại đô thị Vinhomes Grand Park Quận 9. (Các căn góc đẹp - Giá siêu tốt)",
                "labelCode": "D7FB",
                "address": "Địa chỉ: S7.05 Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh",
                "attributesId": "d8ce6b59-b0be-42bf-be43-f4456a6dcfee",
                "categoryCode": "CTCH",
                "description": "[\"Tôi hiện có các căn góc ở Phân Khu Origami – đại đô thị Vinhomes Grand Park Quận 9 mới nhận nhà cần cho thuê:\",\"+ Căn góc 59m2 – 2 Phòng Ngủ đã trang bị sẵn nội thất cơ bản gồm: Tủ bếp hoàn chỉnh được thiết kế rất đẹp, rèm cửa trang bị đủ các phòng.\",\"+ Căn góc 69m2 – 2 Phòng Ngủ + đã trang bị sẵn Nội thất Gồm: Tủ bếp hoàn chỉnh và rèm cửa. (hoặc căn hộ cơ bản có máy lạnh).\",\"+ Căn góc 81m2 – 3 Phòng Ngủ với Full nội thất cao cấp gồm: Tủ bếp hiện đại, rèm cửa, Giường, tủ áo, bàn ăn, sofa … (thiết kế riêng rất đẳng cấp).\",\"- Các căn hộ đều được lựa chọn kỹ khi đều là căn góc thoáng mát, View: vườn la hán Nhật, view nội khu rất đẹp với giá cho thuê cam kết siêu cạnh tranh.\",\"- 100% là hình thật từ tầm view, nội thất, chủ nhà mới chận chưa ai ở còn mùi sơn mới và sẵn thẻ cư dân, nhà trống giao ngay.\",\"- Tất cả các tiện ích: Hồ bơi, sân bóng bàn, bóng đá, quần vợt và công viên 36ha … đều miễn phí. (Có thêm xe bus điện của Vin rất đẹp và hiện đại )\",\"Vị Trí Thuận tiện: Gần khu công nghệ cao, Đại Học: FPT, Sư Phạm Kỹ Thuật …, sát Bên Quận 2 …\",\"+ Là nơi lý tưởng cho 01 gia đình, sinh viên, nhân viên văn phòng ở và làm việc …\",\"Giá siêu cạnh tranh: 5.9 Triệu – 7.5 Triệu – 12.5 Triêu/tháng\",\"Liên hệ: 0937.554.570 (A.Hoàng) .\"]",
                "userId": "60a0e4b1-4557-48ee-bc34-6b10cbf46294",
                "overviewId": "3dac58a1-d4c4-4d7d-99db-b3309426a70e",
                "imagesId": "694be477-ecfd-4ce2-9789-a816fa7c9b18",
                "createdAt": "2024-06-29T09:07:40.108Z"
            },
            {
                "id": "fbc52081-bcbf-4ee7-934a-5457d4dc83c3",
                "title": "Căn hộ mini ngay Himlam bao đẹp sát lotte quận 7",
                "labelCode": "2BBD",
                "address": "Địa chỉ: Đường D1, Quận 7, Hồ Chí Minh",
                "attributesId": "ebbdc8c2-6e21-4908-8c0e-360ef642f88c",
                "categoryCode": "CTCH",
                "description": "[\"Bên mình còn hai phòng trong tòa chung cư 6 tầng ngay Himlam Q7, phòng giá 6tr500\",\"Phòng có sẵn máy lạnh , kệ bếp , toilet , rộng từ 20-25m2.\",\"Nằm ngay trung tâm q7 nên đi lại thuận tiện giao thông, gần đường lớn , siêu thị , trường học , trung tâm mua sắm chỉ mất 5p chạy xe . Dân cư đông, an ninh tốt, tiện ích quán ăn, cửa hàng...\",\"Để xe trong nhà an ninh, sạch sẽ, thoáng mát, rộng rãi.\",\"Camera, nhân viên trông coi, hỗ trợ sửa chữa lắp đặt nội thất ko mất phí\",\"Phòng đang trống vào ở ngay ALO trước để được xem và tìm cho mình phòng như ý .\",\"Call: 0777.077.612 (gọi trực tiếp hoặc nhắn zalo)\",\"#chothue #chothuequan7 #canhomini #himlam #chothuephong #chothuecanhomini #chungcu\"]",
                "userId": "c7b30c93-635f-405d-a5b6-22b2f6ac323f",
                "overviewId": "88095189-68fa-44ed-9d70-74b061e89894",
                "imagesId": "a7c45ad2-d814-4903-9534-14d993b61e4c",
                "createdAt": "2024-06-25T08:38:41.030Z"
            },
            {
                "id": "414b8e36-5950-4afd-8e04-ea43b4be9c92",
                "title": "Căn hộ 1 phòng ngủ sát lotte full nội thất quận 7",
                "labelCode": "2BBD",
                "address": "Địa chỉ: Phường Tân Quy, Quận 7, Hồ Chí Minh",
                "attributesId": "01e13784-c615-4089-955a-88551a43a73e",
                "categoryCode": "CTCH",
                "description": "[\"Đặc điểm:\",\"+ Phòng rất rộng từ 25m2 - 35m2\",\"+ PHÒNG CÓ NỘI THẤT: máy lạnh, tủ áo, bàn ăn cơm, giường, nệm, quạt, tivi, tủ lạnh,....... căn hộ mini cho không gian sống lý tưởng.\",\"+ Có cửa sổ thông ra trời mát mẻ cả ngày, 1 số phòng có ban công phía ngoài.\",\"+ Giờ giấc tự do, về lúc nào cũng được.\",\"+ Không chung chủ\",\"+ Có máy giặt\",\"+ Wifi mạnh, Có chổ phơi đồ rộng rãi\",\"+ Cửa ra vào mở bằng vân tay, nhà xe có camera chống trộm 24/24\",\"+ Ngay Khu Biệt Thự dân trí cao, đường trước nhà rộng 16m, gần chợ, siêu thị, trung tâm.........\",\"+ Xem phòng đảm bảo thích ngay\",\"Liên hệ: An số điện thoại, hoặc nhắn tin zaloo nhé - 0777.077.612\",\"#chothue\",\"#canhomini\",\"#cănhominiq7\"]",
                "userId": "b0b422e7-d584-4177-a3ef-ce620533d184",
                "overviewId": "8213c394-0fbc-46ac-ac44-baecf0ee14c7",
                "imagesId": "a13ca608-4b8e-4aa0-a6bd-a33d1a9dcab3",
                "createdAt": "2024-06-27T15:04:41.819Z"
            },
            {
                "id": "40306b77-cb0d-41f3-8524-5848165ddc8f",
                "title": "Căn hộ mini đầy ấp ánh sáng mới tinh sát lotte Q7",
                "labelCode": "2BBD",
                "address": "Địa chỉ: Đường Nguyễn Thị Thập, Phường Tân Phong, Quận 7, Hồ Chí Minh",
                "attributesId": "b16e5610-3d06-46a4-ac66-38c06f475939",
                "categoryCode": "CTCH",
                "description": "[\"Mới Tinh Full Nội Thất Ngay đường Nguyễn thị thập, khu tân quy đông đi vào quận 7\",\"Nội thất cao cấp và đầy đủ, chỉ việc xách vali vào ở\",\"Không gian điểm nhấn thiết kế phong cách nhẹ nhàng sang trọng mang đến cho khách hàng sự an yên\",\"Nằm trong khu sầm uất, gần nhiều hàng quán, coffee, chợ, cửa hàng tiện lợi trong bán kính 500m.\",\"⏰Giờ giấc tự do, không chung chủ.\",\"Thuận tiện đi lại giữa các quận\",\"Liên hệ: 0777.077.612 (gọi trực tiếp hoặc nhắn tin zalo)\",\"#chothue #chothuequan7 #canhomini #himlam #chothuephong #chothuecanhomini #chungcu\"]",
                "userId": "80a99de6-e8e8-47f0-b721-f6903a6c393f",
                "overviewId": "406d8b8b-2e1a-470b-9528-b4d4de827c46",
                "imagesId": "a6635f45-d4fc-4792-a8fe-7b2ddaaef385",
                "createdAt": "2024-06-23T14:48:42.873Z"
            },
            {
                "id": "317a5056-5adc-4e16-857f-3dfcedfa69af",
                "title": "Căn hộ mới xây chưa qua sử dụng, ngay Hoàng Hoa Thám, Bình Thạnh bạn hãy người đầu tiên sở hữu, (phòng như hình 1000%)",
                "labelCode": "9DE1",
                "address": "Địa chỉ: Đường Hoàng Hoa Thám, Phường 7, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "f6758463-610b-4040-9ade-88375452d9d2",
                "categoryCode": "CTCH",
                "description": "[\"ĐỪNG VỘI BỎ QUA CĂN HỘ XINH LUNG LINH NÀY , BẠN SẼ TIẾC ĐẤY!\",\"Căn hộ mới xây chưa qua sử dụng, bạn hãy người đầu tiên sở hữu, (phòng như hình 1000%)\",\"56D Lê Trực, phường 7, quận Bình Thạnh\",\"- Phòng thiết kế theo phong cách hiện đại, trẻ trung\",\"-️ Full nội thất không thiếu thứ gì, chỉ cần xách balo vô ở\",\"- Ban công siêu đẹp, thoáng mát, hầm gửi xe ngay bên dưới nhà, cửa cuốn, camera an ninh, thang máy hiện đại\",\"- ️Nội thất gồm : giường, nệm, chăn, ra, gối, tủ áo lớn, tủ lạnh lớn, bộ bàn ghế sofa, kệ bếp, máy lạnh, máy nước nóng..\",\"Điện 4k/kw\",\"Nước 100k/ người\",\"wifi, giữ xe, dọn vệ sinh, hỗ trợ kĩ thuật free\",\"=>>>>Gọi cho mình ngay bạn nhé:\",\"0933598239\",\"(vui lòng gọi hoặc inbox trước giúp mình)\"]",
                "userId": "d76da7ba-e550-4270-ab21-24d240362032",
                "overviewId": "0f2102d1-30f6-40c0-9a83-d7deaaa80573",
                "imagesId": "cbbbdbec-6e71-468f-a865-67f9ce4b9551",
                "createdAt": "2024-06-24T20:27:43.794Z"
            },
            {
                "id": "266977fb-f12c-4688-a21c-97954f974232",
                "title": "Căn hộ full NT 40m2 ngay D1 Bình Thạnh",
                "labelCode": "C91F",
                "address": "Địa chỉ: 156 Đường D1, Phường 25, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "68b8e018-b38f-4639-b6ec-273deeb29cd0",
                "categoryCode": "CTCH",
                "description": "[\"️️ MỘT SIÊU PHẨM ĐỈNH CỦA CHÓP Ở D1 P.25 Q.BÌNH THẠNH ️️\",\"156 Nguyễn Văn Thương (A22 D1), Phường 25, Quận Bình Thạnh\",\"Phòng diện tích 40m2 ,nội thất siêu hiện đại\",\"Nhà có hầm gửi xe, cửa cuốn an ninh, có thang máy.\",\"Phòng tiện nghi : Giường, nệm, tủ quần áo siêu to , siêu khổng lồ, tủ lạnh, máy lạnh, bàn ăn, thảm lông, toilet riêng hiện đại.\",\"Vị trí thuận lợi: gần các siêu thị, trường học, bệnh viện, ô tô có thể vào tận nhà.\",\"View landmark 81.\",\"GIỜ GIẤC TỰ DO, không chung chủ.\",\"Chỉ tính tiền điện, nước, wifi.\",\"Free Máy giặt, vệ sinh, để xe free, hỗ trợ kĩ thuật free.\",\"Tất cả các phòng đều mới 100%, thoáng mát\",\"LH hải 0933598239\"]",
                "userId": "67680711-c891-4012-9b55-3347958a3141",
                "overviewId": "14ebdbbd-9918-4cb9-8e7f-baee29731a27",
                "imagesId": "d63c8ef3-7a38-4a5a-aa93-a54241987e02",
                "createdAt": "2024-06-25T16:00:44.692Z"
            },
            {
                "id": "142a47dd-894a-4fc0-90b9-ee236211db05",
                "title": "Studio ban công, full nội thất, gần ĐH Rmit- khu Phú mỹ Hưng, new 100%, giá giảm mùa dịch",
                "labelCode": "405A",
                "address": "Địa chỉ: Đường Phạm Thái Bường, Phường Tân Phong, Quận 7, Hồ Chí Minh",
                "attributesId": "ff910f5d-6ab0-4dd2-bb05-d4809eb84acb",
                "categoryCode": "CTCH",
                "description": "[\"️️* TOÀ NHÀ SIÊU XINH, PHÒNG SIÊU XỊN\",\"Add: PHÚ MỸ HƯNG - Q7\",\"Nội thất đầy đủ: giường, nệm, tủ quần áo, máy lạnh, máy nước nóng, tủ lạnh, kệ bếp,..\",\"Phòng siêu xịn mà giá hạt dẻ\",\"Giờ giấc tự do, thang máy, hầm giữ xe, .\",\"Bảo vệ 24/24\",\"Mọi thứ đã sẵn sàng, chỉ cần xách vali vào và ở\",\"Ib để được tư vấn và đặt lịch xem phòng miễn phí\",\"033.664.3754 gặp Quân\"]",
                "userId": "a469553e-4bd7-4016-aef9-3a29a3861d43",
                "overviewId": "03a3b2dc-49b5-4514-bc3b-9ac267eb43bd",
                "imagesId": "e8e8c819-99c9-407c-86d0-b4047634bbfb",
                "createdAt": "2024-06-23T14:32:45.536Z"
            },
            {
                "id": "6a4b042c-ef8c-4f7f-bfe8-c27cce963722",
                "title": "Mặt Bằng – Văn Phòng cho thuê, mặt tiền căn góc đường xe hơi Trương Công Định, Phường 14, Tân Bình, 8x14m",
                "labelCode": "3E1F",
                "address": "Địa chỉ: 62/1A Đường Trương Công Định, Phường 14, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "56fb2cc6-bf98-4aad-b4df-0eca39fb99b9",
                "categoryCode": "CTMB",
                "description": "[\"+ Cho thuê Mặt Bằng – Văn Phòng đẹp và sang trọng mặt tiền tầng trệt Căn góc khu phân lô Bàu Cát, Phường 14, Quận Tân Bình.\",\"Địa chỉ: 62/1A-B Trương Công Định, Phường 14, Quận Tân Bình, TP.HCM.\",\"+ Diện tích: 8 x 14m .\",\"+ Tiện ích: Bề ngang lớn 8m được t hiết kế hiện đại, riêng biệt với cửa cuốn và cửa kính cường lực rất đẹp, mặt bằng đã tách làm 2 văn phòng lớn và thiết kế sang trọng, có sân để xe có mái che và WC riêng.\",\"+ Vị trí tuyệt vời: Toạ Lạc Khu Phân Lô Bàu Cát, Đối diện khu cao ốc chung Cư The HARMONA Trương Công Định Gần ngã ba Trường Chinh – Trương Công Định, Quận Tân Bình, , Sát ETOWN cộng hòa, Bệnh Viện Mỹ Đức, chợ Võ Thành Trang (Bà Quẹo), gần nhiều tòa cao ốc văn phòng, công ty, và nhiều trường đại học ….\",\"+ Nhà nằm ngay vị trí Góc đường Xe Hơi trong khu dân cư sầm uất, rất đông người qua lại, ở và làm việc.\",\"+ Là nơi lý tưởng để kinh doanh mọi ngành nghề: kinh doanh online, quán café, cơm văn phòng, ở và mở văn phòng đại diện, văn phòng công ty làm việc …\",\"Giá rất hợp lý: 16 triệu/tháng. (Giá giảm sâu và không tăng giá sau dịch).\",\"Từ Khóa: Văn phòng cho thuê hcm, văn phòng cho thuê quận Tân Bình, cho thuê văn phòng khu bàu cát. Cho thuê mặt bằng hcm, mặt bằng cho thuê hcm, cho thuê mặt bằng quận Tân Bình, Cho thuê mặt bằng Trương Công Định, mặt bằng cho thuê tân bình, mặt bằng cho thuê quận tân bình, cho thue mat bang hcm, mat bang cho thue hcm, mat bang cho thue tan binh …\"]",
                "userId": "7eabf420-e5d9-4049-8886-e7181ebd2801",
                "overviewId": "396626bb-4b55-4ba6-866f-0a96560c8f86",
                "imagesId": "10ee40bc-881c-4dcf-9118-8142149cb3c0",
                "createdAt": "2024-06-23T04:42:46.648Z"
            },
            {
                "id": "543feb71-ae3f-4aef-9d6f-9fd8ff4384f7",
                "title": "Cho thuê mặt bằng mặt tiền đường Quận 4. Làm VP, Spa, Nail, Tóc",
                "labelCode": "6049",
                "address": "Địa chỉ: 12, Phường 6, Quận 4, Hồ Chí Minh",
                "attributesId": "f270a49b-9e76-4f50-8059-ece47b2a5cad",
                "categoryCode": "CTMB",
                "description": "[\"- Chính chủ gửi cho thuê mặt bằng, mặt tiền đường nội bộ đường số Quận 4\",\"- Mặt bằng nằm gần đường Hoàng Diệu, đường Khánh Hội và đường 45, khu dân cư đông đúc, buôn bán sầm uất, an ninh...\",\"- Mặt bằng có chỗ đậu xe ôtô, có lối đi riêng-không chung chủ, có vách ngăn, có toilet riêng\",\"- Diện tích: 4m x 8m = 32m2\",\"- Mặt bằng thích hơp cho thuê văn phòng, nhà thuốc, Spa, Nail, Tóc...\",\"- Ưu tiên văn phòng ký hợp đồng thuê dài hạn\",\"- Chi tiết vui lòng gọi Chúng tôi 0768919886 để được tư vấn và xem nhà, mặt bằng thực tế\",\"Cảm ơn Anh, Chị đã xem tin!\"]",
                "userId": "5a55d0b7-c7b9-40d3-b4b5-ce138fd539de",
                "overviewId": "1b921326-f1a4-4c39-9409-14132091ce43",
                "imagesId": "12dcad73-736d-4222-8220-48ba6fb9d802",
                "createdAt": "2024-06-29T15:02:47.686Z"
            },
            {
                "id": "9d67c945-9fbc-419b-9ed0-9b360cb3d31c",
                "title": "CHO THUÊ MẶT BẰNG 4X16 , đường nội bộ 12 mét",
                "labelCode": "1ECE",
                "address": "Địa chỉ: Đường Cao Lỗ, Phường 4, Quận 8, Hồ Chí Minh",
                "attributesId": "4b92f455-dc99-42d7-9758-6dead3f5d049",
                "categoryCode": "CTMB",
                "description": "[\"CHO THUÊ MẶT BẰNG 4X16, ĐƯỜNG NỘI BỘ 12 MÉT\",\"PHÍA TRƯỚC CÔNG VIÊN NỘI BỘ, THƯỜNG XUYÊN CÓ NGƯỜI QUA LẠI SINH HOẠT.\",\"ĐƯỜNG MẬT ĐỘ DÂN CƯ Ở ĐÔNG , XE CỘ LƯU THÔNG NHIỀU\",\"CÓ CHỖ ĐẬU OTO, VÀ BẾP NẤU RIÊNG VÀ TOLET RIÊNG.\",\"CÓ THỂ TĂNG THÊM DIỆN TÍCH KINH DOANH KHI CẦN THIẾT.\"]",
                "userId": "fbea3221-6afa-40ef-8b2b-df8aecac8650",
                "overviewId": "d995f385-e5d5-4dd5-a5a6-39be9e5fcb96",
                "imagesId": "b49b9ef5-b8c6-4b1c-8e88-056ca3caf3ad",
                "createdAt": "2024-06-26T03:36:48.711Z"
            },
            {
                "id": "40f2d0d7-bd06-4d7d-9fb0-95ff6357c646",
                "title": "CHO THUÊ MBKD PHỐ ĐẠI LINH, MỄ TRÌ, TỐ HỮU",
                "labelCode": "0CFE",
                "address": "Địa chỉ: 50 Đại Linh, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
                "attributesId": "c3817f44-86af-40b7-a429-a49fdb822c5c",
                "categoryCode": "CTMB",
                "description": "[\"MBKD 54 Phố Đại Linh Trung Văn Nam Từ Liêm Hà Nội\",\"Vị Trí: Gần Big C Thăng Long, Trung Tâm Hội Nghị Quốc Gia, Mĩ Trì, Tố Hữu, Trung Văn\",\"Diện Tích:30m2\"]",
                "userId": "b7282704-4a0a-40d6-82d7-3506ee08fd37",
                "overviewId": "6e69a4d6-19b2-4d78-8853-9404029a5bed",
                "imagesId": "b2885c83-2f10-4f2c-8e5c-49fa413b6ce9",
                "createdAt": "2024-06-29T15:58:49.677Z"
            },
            {
                "id": "0f257ca6-4f59-47b4-b1f9-e1839f5adafd",
                "title": "Cho thuê Nhà, Kho, Bãi Phong Phú, Đa Phước, Bình Chánh",
                "labelCode": "59D8",
                "address": "Địa chỉ: Huyện Bình Chánh, Hồ Chí Minh",
                "attributesId": "40bdc2e5-baca-41cf-a352-7d0341318216",
                "categoryCode": "CTMB",
                "description": "[\"CHO THUÊ NHÀ Ở, HOẶC LÀM KHO\",\"Diện tích 100m2, 200m2 tới 600m2\",\"Đường rộng từ 3 tới 10m\",\"Giá từ 8 triệu tới 25 triệu/tháng\",\"Khu vực dọc theo Quốc Lộ 50, Các xã Bình Hưng, Phong Phú và Đa Phước huyện Bình Chánh\",\"Đường rộng, hẻm to, xe tải, xe cont chạy chạy tới kho. Thuận tiện giao thương giữa tuyến QL50, Nguyễn Văn Linh về Các Cảng trong Sài Gòn, Cảng Long An và các tỉnh miền Tây.\",\"Do có 5 kho như trên nên không đang cụ thể hết. Em dẫn đi xem từng kho. Khách hàng nói chuyện và thương lượng trực tiếp với chủ.\",\"DẪN ĐI XEM MIỄN PHÍ KHÔNG LẤY TIỀN CAFE CÀO PHÁO GÌ HẾT\",\"Cảm ơn đã xem tin !!!\"]",
                "userId": "0c505dd6-5081-4ae5-a1bb-ec5436aead0d",
                "overviewId": "bc9155c8-3bac-4a6a-9fc3-3d364f85b15d",
                "imagesId": "1b34ba56-ccd9-4458-a5db-9d36e1ed5401",
                "createdAt": "2024-06-23T09:21:50.637Z"
            },
            {
                "id": "d4633485-b68a-4b99-bbbf-ab7fe488eff6",
                "title": "Nhà nguyên căn mặt tiền đường 9*18m",
                "labelCode": "C805",
                "address": "Địa chỉ: Đường Hiệp Thành 45, Phường Hiệp Thành, Quận 12, Hồ Chí Minh",
                "attributesId": "1db22ef7-f19c-4fc4-ab54-ddd54d1e57c9",
                "categoryCode": "CTMB",
                "description": "[\"- Mặt bằng kinh doanh 1 trệt 3 lầu (9*18m)\",\"- Gần trường học vd: Thpt Võ Trường Toản;...\",\"- Gần chợ, siêu thị,tạp hóa;...\"]",
                "userId": "095babe6-5336-4d3f-b2da-820a093895e0",
                "overviewId": "e74d5011-8434-4e3a-9c5b-14ca9faaa678",
                "imagesId": "bb31ea1f-21bf-473d-aad1-64cb184b184a",
                "createdAt": "2024-06-29T10:00:51.507Z"
            },
            {
                "id": "6f3be772-1bc3-43fe-9ea7-77bc87461f84",
                "title": "MẶT BẰNG NGUYỄN DUY DƯƠNG Q5 GIÁ RẺ",
                "labelCode": "50D3",
                "address": "Địa chỉ: 97D Đường Nguyễn Duy Dương, Phường 9, Quận 5, Hồ Chí Minh",
                "attributesId": "b2c66b91-f304-4bd0-9bd4-08e62bc11582",
                "categoryCode": "CTMB",
                "description": "[\"MẶT BẰNG NGAY MẶT TIỀN 97D NGUYỄN DUY DƯƠNG Q5\",\"Ngay chợ An Đông\",\"Gần siêu thị COORMARK AN ĐÔNG, gần các bến xe\",\"Nhà mới dọn vô ở liền\",\"Phù hợp kinh doanh nhiều ngành nghề\",\"Có chỗ ngủ lại\",\"Wc riêng\",\"GIÁ CẢ THƯƠNG LƯỢNG\",\"LIÊN HỆ 0936100103 A SỸ ĐỂ XEM MẶT BẰNG\"]",
                "userId": "998c6f00-63c5-4559-9127-8f5400868309",
                "overviewId": "d1cffa98-86f1-4f01-8893-1adff8534064",
                "imagesId": "f452028c-ca30-4dab-8f9e-274e350977cd",
                "createdAt": "2024-06-23T12:28:52.426Z"
            },
            {
                "id": "208e389f-f7cd-4b32-8503-6f7cdeaddaca",
                "title": "[ CHO THUÊ MẶT BẰNG - KINH DOANH]",
                "labelCode": "0CFE",
                "address": "Địa chỉ: Số 10 ngõ 54 Đại Linh, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội",
                "attributesId": "46660a24-058a-4693-b678-bde5324044ab",
                "categoryCode": "CTMB",
                "description": "[\"CHO THUÊ MẶT BẰNG KINH DOANH\",\"Diện tích : 30m2\",\"Có điều hòa, cửa kính\",\"Phù hợp tạp hóa, bán hàng online, văn phòng khởi nghiệp....\"]",
                "userId": "e5017d8e-228a-456a-b4ff-9dd0a6e1d504",
                "overviewId": "d7744727-d57b-46ce-bff6-d50a71834045",
                "imagesId": "c7432680-6b5b-41ee-8dab-6dab8b1f91c9",
                "createdAt": "2024-06-26T13:54:53.216Z"
            },
            {
                "id": "e0cbbf5d-687c-4f4d-9a1b-164c5a095f04",
                "title": "Tôi. Quốc chính chủ cho thuê mặt bằng mặt tiền Võ Thị Sáu, Quận 1 - 105m2 - chỉ 30tr/tháng. Liên hệ: 0822141489",
                "labelCode": "AB63",
                "address": "Địa chỉ: 94 Đường Võ Thị Sáu, Phường Tân Định, Quận 1, Hồ Chí Minh",
                "attributesId": "a70e18fa-b01e-4482-9ea1-971a2e46583b",
                "categoryCode": "CTMB",
                "description": "[\"Tôi, Quốc chính chủ căn nhà mặt tiền 94 Võ Thị Sáu, Tân Định, quận 1. Cho thuê mặt bằng mặt tiền Võ Thị Sáu\",\"Ngang 4,2 dài 25. Diện tích sử dụng lên đến 105m2\",\"Không gian được thiết kế theo phong cách châu âu\",\"Cho thuê làm văn phòng, mặt bằng kinh doanh ( không cho làm quán ăn, quán Coffe vì sợ xuống cấp nhà )\",\"Ngay khu sầm uất, gần trường học, khu ăn uống, công viên…\",\"Thuận tiện di chuyển các quận trung tâm.\",\"Cho thuê hợp đồng dài hạn\",\"Miễn môi giới\",\"Liên hệ : 0822141489 ( Quốc )\"]",
                "userId": "78070eed-ce6e-4ceb-ad12-4a83322772e2",
                "overviewId": "a19db5f5-5731-4ccb-83ab-4d05b0af9dca",
                "imagesId": "25803c53-b0d5-4ee6-82c3-dffc5d1ce142",
                "createdAt": "2024-06-27T05:13:54.319Z"
            },
            {
                "id": "bbddaa92-c715-4f2b-8d61-5efcb9b5c65d",
                "title": "Cho thuê MB siêu rộng, mới 100% - 75m2 - hẻm trước nhà rộng 5m - chỉ 16tr/tháng",
                "labelCode": "4C34",
                "address": "Địa chỉ: Đống Đa, Phường 2, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "18ccb92b-34ff-4663-83e7-1169d50676d5",
                "categoryCode": "CTMB",
                "description": "[\"Cô Thảo cho thuê Mặt bằng mặt tiền Đống Đa diện tích khủng\",\"Giá: 16tr/tháng\",\"Mặt bằng trệt rộng 75m2, cho thuê nguyên sàn\",\"Có hầm và cho ở lại.\",\"Đa tiện ích, tiện làm văn phòng, ở, kinh doanh buôn bán,..\",\"Ngang 8.5m, dài 8.9\",\"Lh: 0822141489 - Quốc - ( Quản lý tỏa nhà )\"]",
                "userId": "1af4d91e-1b7b-45aa-b356-a6f7d6ecea07",
                "overviewId": "ed317398-4cb2-4e04-b2d1-1c523156419e",
                "imagesId": "e4587aef-6d86-4bc6-88d2-f5d2cfaeea35",
                "createdAt": "2024-06-28T17:39:55.333Z"
            },
            {
                "id": "b5f3bfc2-b423-455d-8009-fa3084af06eb",
                "title": "CHO THUÊ MẶT BẰNG 176 CHU VĂN AN, BÌNH THẠNH.",
                "labelCode": "4C34",
                "address": "Địa chỉ: 176 Đường Chu Văn An, Phường 26, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "1c60c6b6-1807-494d-9ed5-e26fe6ef2e6a",
                "categoryCode": "CTMB",
                "description": "[\"CHO THUÊ MẶT BẰNG 176 CHU VĂN AN, BÌNH THẠNH.\",\"Thông tin chi tiết: NHÀ MẶT TIỀN 176 CHU VĂN AN, BÌNH THẠNH\",\"Thích hợp làm Công ty, Văn phòng, Thẩm mỹ viện, Spa, Showroom....\",\"Diện tích: 4m x 8m, CÓ TẦNG HẦM ĐỂ XE. CÓ TOLET RIÊNG\",\"Ưu điểm mặt bằng nhà:\",\"- Có tầng hầm để xe, ô tô đậu trước nhà.\",\"- Nhà mặt tiền, có vị trí đắc địa trong khu đông dân cư, gần chợ, siêu thị, quán ăn uống, trung tâm thương mại, phòng tập gym… Ngay cửa ngõ thuận tiện đi đến Quận 1, 2, 3, bến xe miền Đông và các tính phía Bắc.\",\"Thanh toán tiền thuê đa dạng theo mỗi 3/6/12 tháng một lần.\",\"Tạo điều kiện thời gian di dời đến.\",\"Hỗ trợ giá trong thời gian đầu khi thuê.\",\"Thông tin liện hệ: Chủ nhà Mr. Vũ. Gọi điện, nhắn tin HOẶC qua zalo theo số đt liên hệ.\"]",
                "userId": "2f3840f3-937e-4ac7-94d6-62b58f8fca45",
                "overviewId": "f8c276fa-aea5-4976-b65c-7fb69ad5d77d",
                "imagesId": "ec42f53e-a391-41ed-ae1c-afad334e6514",
                "createdAt": "2024-06-26T04:52:56.107Z"
            },
            {
                "id": "08190c52-11ad-41a4-b85c-451f7c9ccf96",
                "title": "Cho thuê mặt bằng khu vực phường 13 Quận Tân Bình",
                "labelCode": "3E1F",
                "address": "Địa chỉ: 22A Thân Nhân Trung, Phường 13, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "cf7bcf85-2ff0-4619-8ed3-99dc6715d5c5",
                "categoryCode": "CTMB",
                "description": "[\"- Cho thuê nhà mặt tiền chiều rộng 3,7 m, dài 23 m.\",\"- Đường trước nhà rộng 16 m, vỉa hè rộng 4m.\",\"- Nhà thích hợp cho việc kinh doanh, mở shop, cửa hàng.\",\"- Nhà được thiết kế để cho thuê mặt bằng ở phía trước, mọi sinh hoạt gia đình ở phía sau bao gồm phòng ngủ, bếp, 2 nhà vệ sinh.\",\"- Mặt tiền phù hợp với shop thời trang, đại lý vé máy bay, phòng mạch, tiệm làm tóc vv...\",\"- Nhà nằm cách đường Cộng Hòa 200 m, cách trường Dân Lập Nguyễn Khuyến 200 m, nằm trong khu dân cư sầm uất.\",\"- Xung quanh có đầy đủ chợ siêu thị, nhà trẻ, trường cấp 1-2-3.\",\"* Nhà chính chủ miễn tiếp trung gian.\",\"-\",\"LH gặp chủ nhà: 0344.268.548 (Cô Vân)\"]",
                "userId": "8087fc6d-460e-431b-b645-a8634678a1d8",
                "overviewId": "d036bb6f-93d3-414f-9be6-c8b8671875a2",
                "imagesId": "7fefad14-069d-4405-a36a-cbffb3f5eacc",
                "createdAt": "2024-06-26T12:13:57.003Z"
            },
            {
                "id": "f3132aa2-01d4-449c-88fa-b8d1ca00bf84",
                "title": "Cho thuê trang trại chăn nuôi heo, có chuồng heo xây sẵn sức chứa 300 con, hệ thống điện nước đầy đủ",
                "labelCode": "2A73",
                "address": "Địa chỉ: Đường Bửu Long, Xã Tân Bình, Huyện Vĩnh Cửu, Đồng Nai",
                "attributesId": "c330c7c5-684a-45af-af54-b88d4f52db48",
                "categoryCode": "CTMB",
                "description": "[\"Cần cho thuê trang trại chăn nuôi heo, gấn trung tâm khu du lịch Bửu Long, Đồng Nai.\",\"Chuồng xây sẵn, hệ thống điện nước đầy đủ.\",\"Có nhà cấp 4 ở lại, tiện sinh hoạt, chăn nuôi, thích hợp cho gia đình yêu thích nông nghiệp, muốn phát triển mô hình vườn, ao , chuồng,...\",\"Liên hệ: Cô Thanh 0913609230 hoặc anh Anh 0903627665\"]",
                "userId": "3e89fbaa-c482-4e03-86f9-38f13d00df6a",
                "overviewId": "bbfaeebf-1477-4df3-8ebd-a780bdde78a9",
                "imagesId": "a6c3fa18-14eb-4e11-8ec8-14dc671c80c5",
                "createdAt": "2024-06-27T21:05:57.857Z"
            },
            {
                "id": "54f1afbc-6509-4c13-bbba-0a73413aff61",
                "title": "Mặt tiền trung tâm tiện mở đại lý Honda, thế giới di động, điện máy xanh,... trung tâm thị trấn Phú GIáo, Bình Dương",
                "labelCode": "8322",
                "address": "Địa chỉ: Đường Tỉnh lộ 741, Xã Phước Hòa, Huyện Phú Giáo, Bình Dương",
                "attributesId": "06c87481-b147-475e-a3cc-3a1d4b20d17d",
                "categoryCode": "CTMB",
                "description": "[\"Đất 2 mặt tiền. Mặt tiền đường lớn ĐT741, rộng 26m, mặt tiền hông dài 30m, đường bê tông rộng 10m, thuận tiện làm kho, nhà xưởng, đại lý xe Honda, thế giới di động hoặc mở trạm xăng.\",\"Khu vực đông dân cư, gần khu công nghiệp, chợ, trường học, trung tâm huyện Phú Giáo\",\"Cho thuê dài hạn, giá thuê 20tr/tháng\",\"Liên hệ Chị Thanh: 0913 609 230 hoặc 0903627665\"]",
                "userId": "8b6cb796-10e9-439b-84c5-fda481ccc92a",
                "overviewId": "26af3b44-d35a-4119-a820-d317b90f3a93",
                "imagesId": "9a285eea-b340-4278-b9da-83228c22f6b1",
                "createdAt": "2024-06-26T13:01:58.949Z"
            },
            {
                "id": "c567fb16-c462-4772-8352-10a8a350ea50",
                "title": "Khai Trương Sàn Làm Văn Phòng Mặt Tiền Trần Quang Khải Gần Cầu Bông",
                "labelCode": "AB63",
                "address": "Địa chỉ: Đường Trần Quang Khải, Phường Tân Định, Quận 1, Hồ Chí Minh",
                "attributesId": "35ae82d6-27cd-4191-88c1-8b3b9a1293f2",
                "categoryCode": "CTMB",
                "description": "[\"Hiện tại bên e cho thuê 2 sàn làm Văn Phòng ngay mặt tiền Trần Quang Khải gần với Cầu Bông một địa điểm cực kỳ đắc địa.\",\"Sàn 1:\",\"Diện tích 55m2 - 25Tr\",\"Sàn 2:\",\"Diện tích 55m2 - 25Tr\",\"Sếp nào muốn làm luôn văn phòng rộng rãi dành cho nhân viên của mình thì làm luôn 2 sàn với tổng diện tích là: 110m2 - 50Tr.\",\"Ngoài ra toàn nhà còn sở hữu một sân thượng với quả Views xin sò để cho có thể hóng mát và thư giãn sau những giờ làm việc chăm chỉ\",\"️ Liên hệ trực tiếp SĐT gặp E (Trọng An) để được tư vấn, đi xem và sở hữu cho mình một Văn phòng như ý ạ.\"]",
                "userId": "da066415-5004-446d-a824-1d13d451b777",
                "overviewId": "29ca89ea-bea1-44c2-b5a8-f730743201c8",
                "imagesId": "689c7306-bff1-4c9c-83b1-cc5ca6207465",
                "createdAt": "2024-06-29T23:33:59.769Z"
            },
            {
                "id": "6fc7df86-4bca-4824-9357-4e3991932126",
                "title": "Mặt bằng đẹp cho bán đồ ăn đường vào sân bay",
                "labelCode": "0E03",
                "address": "Địa chỉ: Đường Duy Tân, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng",
                "attributesId": "621a9d7a-9e9c-40c2-8ab3-f25688e472db",
                "categoryCode": "CTMB",
                "description": "[\"Mặt bằng đẹp cho bán hàng ăn sáng trưa, chiều, tối, khuya. Trên đường vào và gần sân bay, nơi có hàng nghìn người có nhu cầu ăn(vì trong sân bay quá đắt) gồm hành khách đi mb, nhân viên sân bay, taxi, grab...mùa covid vẫn bán cả trăm xuất. Mặt tiền có thể sử dụng 7,5m. Vỉa hè 6m. Giá 4 tr/tháng, hợp đồng 1 năm, cọc 1 tháng, trả tiền hàng tháng. Lh a cường 0888880132.\"]",
                "userId": "c3d61f06-e5e4-4b96-bc35-086ce6b8b4e0",
                "overviewId": "f9cfa5dd-3ad8-43ee-b57d-65420f9fecc4",
                "imagesId": "2f3bd519-75ad-4edd-92d2-e88df96f67ee",
                "createdAt": "2024-06-25T11:46:00.793Z"
            },
            {
                "id": "487e5a69-c52c-48ce-9d3c-bfcdf138f9f8",
                "title": "Chủ đầu tư IMG cho thuê mặt bằng tòa nhà Artemis vị trí đẹp nhất quận Thanh Xuân",
                "labelCode": "7BA5",
                "address": "Địa chỉ: 3 Phố Lê Trọng Tấn, Phường Khương Mai, Quận Thanh Xuân, Hà Nội",
                "attributesId": "b153b3c7-32b0-44dd-9729-0c729bf5bd00",
                "categoryCode": "CTMB",
                "description": "[\"Tòa nhà Artemis, số 3 Lê Trọng Tấn với 4 mặt tiền được tọa lạc tại vị trí đắc địa: Ngã tư Trường Chinh, Tôn Thất Tùng, Lê Trọng Tấn. Với 8 tầng thương mại văn phòng được thiết kế hiện đại, dịch vụ tối ưu, phù hợp làm Ngân hàng, Văn phòng đại diện, Cửa hàng nước giải khát.\",\"1. Vị trí:\",\"Tòa nhà Artemis tại ngã tư Lê Trọng Tấn, Trường Chinh giao Tôn Thất Tùng,vị trí đắc địa trung tâm quận Thanh Xuân.\",\"- Đối diện Bệnh viện đại học Y Hà Nội\",\"- Đối diện bảo tàng Phòng Không Không Quân\",\"- Ngã tư sở: cách 200m\",\"- Bến xe Giáp Bát: cách 2km\",\"- Hồ Hoàn Kiếm: cách 6km\",\"- Cầu Vĩnh Tuy: cách 4km\",\"2. Tổng quan:\",\"Tổng diện tích sàn thương mại, văn phòng: 36.000 m2, view rộng, thoáng, tầm nhìn siêu đẹp bao quanh Hà Nội\",\"- Diện tích 1 sàn: 4.500 m2\",\"- Diện tích cho thuê linh hoạt từ 60-80-100-150-200-500-1000-2000-3000-4000 m2 theo nhu cầu sử dụng của khách hàng\",\"- Số lượng thang máy: 08 thang máy tốc độ cao\",\"- Tầng hầm để xe: 03 tầng hầm rộng 10.000 m2\",\"- Sảnh văn phòng và thương mại theo tiêu chuẩn văn phòng hạng B, có lễ tân hướng hướng dẫn từ 08h15 17h15\",\"- An ninh bảo vệ: 24/24 trực tất cả các ngày trong tuần\",\"- Hệ thống điều hòa Chiller tòan bộ 8 tầng văn phòng thương mại\",\"- Vệ sinh chuyên nghiệp, sạch sẽ,\",\"- Chăm sóc khách hàng, Kỹ thuật hỗ trợ 24/7\",\"- Hệ thống PCCC hiện đại theo tiêu chuẩn mới nhất.\",\"3. Giá thuê: 350.000 m2/tháng\",\"4. Liên hệ:\",\"- Khách hàng thuê có nhu cầu liên hệ trực tiếp Chủ đầu tư: Ms Thu 0987878949\",\"- Hoa hồng hấp dẫn từ 1,2 - 2 tháng tiền thuê cho đối tác môi giới.\"]",
                "userId": "ffff4a63-d8c7-4c96-a108-8a3205af9af6",
                "overviewId": "fac5bd6f-89eb-43d3-8d23-a593320a8c90",
                "imagesId": "a3035f72-9e97-4de8-a16a-4a4f0f5e63f9",
                "createdAt": "2024-06-24T04:22:02.007Z"
            },
            {
                "id": "c33dbedc-a229-43d4-83ee-fb58b52440d7",
                "title": "Cho thuê nhà phố shophouse Green River Q8-1trệt 1lầu 151m2 có nội thất cơ bản khu dân cư hiện hữu",
                "labelCode": "1ECE",
                "address": "Địa chỉ: 2225 Phạm Thế Hiển, Phường 6, Quận 8, Hồ Chí Minh",
                "attributesId": "2db12846-a9e5-4ba6-8c0f-21cf3222855d",
                "categoryCode": "CTMB",
                "description": "[\"*Cho thuê 1 trệt 1 lầu 151m2-183m2 tại CĂN HỘ - ̣ ̂́ ̂̉ ̣̂ . DT Ngang 8m x dài 10m- gồm 1 tầng trệt có cầu thang lên tầng 2\",\"*CHO THUÊ NGUYÊN CĂN 20TR/ THÁNG hiện tại có 2 căn block B mặt ngoài, 2 căn block B mặt trong, 2 căn block A mặt ngoài và trong.\",\"*CHO Thuê tầng trệt 14tr/ tháng\",\"*SẢN PHẨM AN TOÀN KINH DOANH THUẬN LỢI\",\"Cập nhật tình hình mở bán các căn SHOPHOUSE 1 trệt 1 lầu đang được đưa vào sử dụng hiệu quả tại Green River Quận 8.\",\"*BLOCK A:\",\"1. Salon tóc CƯỜNG AN ĐÔNG\",\"2. Nha Khoa TÂM ĐAN\",\"3. SPA DAISY\",\"4. SPA LINH PHẠM\",\"5. Shop sản phẩm dành cho Mẹ và Con\",\"6.Cafe Bất động sản\",\"7. Trà sữa chân châu\",\"8. Bún đậu mắm tôm\",\"* BLOCK B:\",\"1. Cafe NAPOLI\",\"2. Cafe VIVA coffe\",\"3. Cafe Kai\",\"4. Vẽ tranh nghệ thuật sáng tạo cùng bé\",\"5. Trung tâm tổ chức sự kiện\",\"*BLOCK C:\",\"1. Cafe KARA\",\"2. Cửa hàng tiện lợi Family Mart\",\"3. Cửa hàng tiện lợi 24h Win mart + Phúc Long coffe\",\"4. ATM tự động TPBANK\",\"Anh/Chị có nhu cầu sở hữu hoặc thuê kinh doanh có thể tham khảo.\",\"Khu vực an ninh, có bảo vệ trực 24/24\",\"‍️ Liên hệ ngay:***\"]",
                "userId": "67cc4ce5-4185-4857-b0d3-678843a47d35",
                "overviewId": "68d9613e-9e51-4957-b7d2-940459af7cc9",
                "imagesId": "0f6cd7d7-a4f6-4983-baf0-340424077d75",
                "createdAt": "2024-06-24T22:10:02.908Z"
            },
            {
                "id": "be9a8f95-0bdb-428c-af12-c569d559e426",
                "title": "Cho thuê văn phòng ở Toà nhà Landmark 81 Đường Điện Biên Phủ, Phường 22, Quận Bình Thạnh",
                "labelCode": "4C34",
                "address": "Địa chỉ: Toà nhà Landmark 81 Đường Điện Biên Phủ, Phường 22, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "5df6aefc-d271-425d-807d-024acb21acc6",
                "categoryCode": "CTMB",
                "description": "[\"Cho thuê văn phòng ở Toà nhà Landmark 81  Đường Điện Biên Phủ, Phường 22, Quận Bình Thạnh\",\"Tổng diện tích 407m2\",\"Sang trọng hiện đại tiện nghi bật nhất\",\"mọi chi tiết vui lòng liên hệ trực tiếp Ms. Bình 0909488724\"]",
                "userId": "504d150a-52f2-4f3e-86ef-cf2de50059c6",
                "overviewId": "c3b1090f-c090-4e6d-b68a-2eb2acb912b7",
                "imagesId": "daa45042-7475-4a92-8384-611a7c402146",
                "createdAt": "2024-06-28T20:13:03.680Z"
            },
            {
                "id": "a174b2d2-233a-44bc-86db-2b8bdf7050e1",
                "title": "Cho Thuê Mb VP Cty , Full Nội Thất , Máy Lạnh Các Phòng , 140m2 , 1T , 1 Lửng , Ngã Tư Bình Phước",
                "labelCode": "9929",
                "address": "Địa chỉ: 23/22B 12, Phường Hiệp Bình Phước, Quận Thủ Đức, Hồ Chí Minh",
                "attributesId": "1b953b53-7377-4abe-ace4-5b49bcd618d8",
                "categoryCode": "CTMB",
                "description": "[\"-Cho thuê Mặt Bằng Trệt và Lửng làm Văn Phòng Cty , nằm trong Toà Nhà Phố Cao Cấp , có đầy đủ nội thất.\",\"-Vị Trí “ Tuyệt Đẹp “ góc 2 Mặt Tiền , Đông Bắc và Đông Nam phù hợp phong thuỷ với hầu hết các tuổi.\",\"+ Dt : 140m2\",\"Gồm : 1 Vp trệt , 2 vp tầng Lửng ( Phòng sếp & phòng họp)\",\"-Bán kính từ 3km – 5km\",\"+ Đh Luật , Phạm Văn Đồng , Vạn Phúc City , thuận tiện đi Bình Thạnh , Gò Vấp ..!\",\"-Dọc theo QL1A :\",\"+ Về An sương , q12 và Củ chi….!\",\"+ Về Linh xuân , Xa Lộ Hà Nội , ngã tư thủ đức , chợ đầu mối nông sản.\",\"-Cách ngã tư Bình Phước chỉ 500m , ngay chân cầu Vĩnh Bình ( qua cầu là Bình Dương ).\",\"-Giá : 18 Triệu / Tháng . Điện 4k . Nước 20k\",\"-Phù Hơp làm Vp Cty , IT , Tư Vấn , CSKH , …!\",\"-Đường trải nhựa 8m , ko ngập , oto có thể ra vào thoải mái , dân cư hiện hửu , an ninh .!\",\"-- Liên Hệ : Bền Nguyễn , Zalo 0904 509 552 ( Tư Vấn 24/24).\"]",
                "userId": "c304b445-4132-44e5-ae5b-87f4fccc93d3",
                "overviewId": "7f54a60c-4588-4dbf-8b09-1436dbff4288",
                "imagesId": "c65f476e-6db0-4fad-8832-cac757ee2762",
                "createdAt": "2024-06-27T04:51:04.778Z"
            },
            {
                "id": "722a038a-abfb-44f8-9816-f68fc3fc353f",
                "title": "Cực phẩm KTX, Phòng trọ, Sang, Xịn, Mịn Giá siêu rẻ tại Thủ Đức",
                "star": "5",
                "labelCode": "3534",
                "address": "Địa chỉ: 101 Đường số 8, Phường Linh Đông, Quận Thủ Đức, Hồ Chí Minh",
                "attributesId": "185d3b87-c677-4949-9ae6-c5d99414e71b",
                "categoryCode": "CTPT",
                "description": "[\"> Giá trọn gói, không phát sinh bất cứ khoản phí nào nữa.\",\"*** Miễn phí :\",\"- Để xe máy ( Để xe trong sân cực rộng và thoáng)\",\"- Điện, nước.\",\"- Wifi, rác, vệ sinh - Nước uống. ....\",\"*** Nội thất gồm : - Giường, Chăn, Ga, Gối, Nệm, đèn đọc sách, bàn học, gương trang điểm, tủ quần áo ( mỗi người 2 tủ ), tủ tài chính, tất cả đều là hàng cao cấp ( các bạn xem hình là hiểu, hình thật 100% ). Có phòng nấu ăn và phòng sinh hoạt chung - Máy lạnh, máy giặt, tivi, tủ lạnh ( mỗi phòng 1 tủ để trong phòng ) không thiếu bất cứ thứ gì. - Khoá Vân tay 2 chiều. - Tolet riêng trong phòng ( có nước nóng năng lượng mặt trời ). ***** Đặc biệt: Dịch vụ vệ sinh miễn phí Tollet , phòng, hành lang 2 lần 1 tuần. Cảm ơn các bạn đã xem tin. Nếu xem phòng vui lòng call :\",\"Mr Bình. 0936.456.678.\",\"Địa chỉ : 101 Đường số 8, Phường Linh Đông. Q. Thủ Đức\"]",
                "userId": "18014c4f-d0cd-447c-85be-ce4651133e06",
                "overviewId": "52988b4e-6330-4325-8f26-b0d6330fa2dd",
                "imagesId": "7b466504-0d6b-4bfc-b93b-ed3d0e9c47d0",
                "createdAt": "2024-06-28T15:00:05.656Z"
            },
            {
                "id": "9316ec96-c072-47e6-8ab6-0a23e9ef6f94",
                "title": "PHÒNG SLEEPBOX RIÊNG TƯ ĐẦY ĐỦ TIỆN NGHI RIÊNG TƯ AN NINH 24/24",
                "star": "5",
                "labelCode": "899A",
                "address": "Địa chỉ: 50 Đường Phạm Cự Lượng, Phường 2, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "92e89617-4130-4707-b9b3-669ef5ec4b7b",
                "categoryCode": "CTPT",
                "description": "[\"Sleepbox đầy đủ tiện nghi riêng tư an ninh 24/24.\",\"KTX sleepbox cao cấp ngay Phổ Quang (50 Phạm Cự Lượng)\",\"Xách vali vào ở ngay.\",\"Vị Trí Trung Tâm Quận tân Bình\",\"Ngay bệnh viện Tâm Anh\",\"Ưu đãi tháng đầu chỉ còn 1.400.000đ cho 10 bạn đăng kí sớm nhất\",\"Giá bình thường các tháng 1tr6/tháng/người (Bao chi phí điện nước, wifi, máy lạnh, nước uống, rác, ).\",\"Vị trí đẹp thuận lợi:\",\"- Thuận tiện di chuyển sân bay, Cộng Hòa, Hoàng Hoa Thám, Ngã Tư Phú Nhuận, Quận 1, Quận 11, Quaanj 10...\",\"Phòng được trang bị sẵn đầy đủ tiện ích:\",\"- Giường riêng biệt, nệm cao su + drap.\",\"- Tủ quần áo, tủ đồ riêng.\",\"- Đèn học, ổ cắm điện.\",\"- WC riêng, sạch sẽ.\",\"- Khu vực bếp nấu ăn chung (Đầy đủ dụng cụ - lò vi sóng - bếp - xoong nồi... ).\",\"- Nước uống I - On miễn phí\",\"- Wifi siêu tốc.\",\"- Ra vào cửa vân tay.\",\"- Bảo vệ, quản lý 24/7.\",\"- Dọn vệ sinh hằng ngày\",\"- Thang máy, máy giặt, nơi phơi đồ riêng.\",\"- Hệ thống camera an ninh.\",\"- Chỗ sinh hoạt luôn được vệ sinh sạch sẽ.\",\"Địa chỉ: Cs1: 50 Phạm Cự Lượng, Phường 2, Tân Bình\",\"CS2: 69/38/11 Nguyễn Gia Trí, P. 25, Bình Thạnh..\",\"CS3: 60/18A Huỳnh Khương An, Phường 5, Gò Vấp.\",\"Liên Hệ: 0896.119.779 ( Zalo + SDT )\"]",
                "userId": "98711fe9-8498-46c5-91b1-f1d09ed24233",
                "overviewId": "25fda8ce-6d8e-4f8a-9b49-3dac80a9ba81",
                "imagesId": "9ba4bf63-45bd-4c92-ab6f-23740d12a35e",
                "createdAt": "2024-06-28T05:09:06.630Z"
            },
            {
                "id": "f11749da-a60e-45a6-848a-f03e5c59d3dd",
                "title": "PHÒNG KTX ĐẠI HỌC CÔNG NGHIỆP (200M) THANG MÁY, MÁY LẠNH, MÁY GIẶT, WIFI, BẾP",
                "star": "5",
                "labelCode": "C6E8",
                "address": "Địa chỉ: 60/18A Đường Huỳnh Khương An, Phường 5, Quận Gò Vấp, Hồ Chí Minh",
                "attributesId": "b068143d-844b-4402-8344-489943042cf2",
                "categoryCode": "CTPT",
                "description": "[\"Be Home ký túc xá đáng sống.\",\"Ngay cổng 4 đại học Công Nghiệp TP. HCM - 200m. Đi bộ 3P.\",\"Giờ giấc tự do.\",\"Ưu đãi giá 900k/tháng đầu tiên cho 20 bạn đăng kí sớm nhất.\",\"Địa chỉ: 60/18A Huỳnh Khương An, Phường 5, Quận Gò Vấp, TP. HCM.\",\"Không gian rộng, có cửa sổ.\",\"Trang bị giường, nệm và drap mới.\",\"Máy lạnh.\",\"Nhà vệ sinh riêng.\",\"Có bếp nấu ăn riêng trong phòng.\",\"Hệ thống wifi công nghiệp mạnh mẽ, ổn định.\",\"Trang bị máy giặt và nơi phơi đồ.\",\"Không gian đảm bảo luôn được vệ sinh sạch sẽ.\",\"Thang máy tiện lên xuống, camera an ninh, bảo vệ 24/7.\",\"Khu tập thể dục thể thao rộng rãi.\",\"Đảm bảo điều kiện sống cho bạn một cách tốt nhất.\",\"Phòng 6 giường.\",\"Giá: 1tr3/người phòng thường.\",\"1tr5/người phòng máy lạnh.\",\"Liên hệ: 0896.119.779 (Zalo + SDT)\"]",
                "userId": "231d3f20-a47d-49d9-bc24-fc5e9c0a67e8",
                "overviewId": "7495d2a3-2902-4760-9bee-29222beed045",
                "imagesId": "32a20a4f-68f6-495e-9efe-e38f5e08695e",
                "createdAt": "2024-06-26T00:27:07.654Z"
            },
            {
                "id": "f063673b-996a-440c-9c00-a3e788f311e5",
                "title": "Cho thuê phòng trọ 128/46 Thiên Phước, P.9, Q.Tân Bình (gần vòng xoay Lê Đại Hành)",
                "star": "5",
                "labelCode": "899A",
                "address": "Địa chỉ: 128/46 Đường Thiên Phước, Phường 9, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "2957979d-7459-420c-bd89-a32680c85ddd",
                "categoryCode": "CTPT",
                "description": "[\"Cho thuê phòng trọ gần vòng xoay Lê Đại Hành + Đại Học Bách Khoa.\",\". Địa chỉ: 128/46 Thiên Phước, P.9, Q.Tân Bình . .\",\". Phòng có tolet riêng, gác lửng + cửa sổ thoáng mát . .\",\". Còn p giá từ 2tr\",\". Có ban công phơi đồ, wifi 80mb cực mạnh free . .\",\". Bạn bè lại chơi nấu ăn trong phòng thoải mái . .\",\". Để xe trong sân nhà thoáng mát có mái che & bảo vệ coi\",\". Điện 3k5/1 số, nước máy 100k/1 người, giữ xe 120k/1 chiếc . .\",\". Vị trị thuận lợi ra Lý Thường Kiệt, Bắc Hải, Lê Đại Hành, Hoàng Văn Thụ , Âu Cơ , 3 tháng 2 , CMT8 chỉ trong 5p .\",\". LH : 0906878018 (Hùng) chính chủ .\"]",
                "userId": "9c636190-b6a2-44c5-ab1a-ba23631c7c8a",
                "overviewId": "2bbfe7f1-1209-4d9a-8108-07d8f33c6543",
                "imagesId": "dfebb343-ab0c-4eb8-969c-72ff165b7444",
                "createdAt": "2024-06-25T13:49:08.527Z"
            },
            {
                "id": "0020d002-df68-47dd-91ef-8b433d6d0dab",
                "title": "PHÒNG TRỌ MỚI SỬA 7/2022 48/13 LƯƠNG THẾ VINH, Phường TÂN THỚI HÒA, TÂN PHÚ (GẦN ĐẦM SEN)",
                "star": "5",
                "labelCode": "EC4A",
                "address": "Địa chỉ: 48/13 Đường Lương Thế Vinh, Phường Tân Thới Hòa, Quận Tân Phú, Hồ Chí Minh",
                "attributesId": "81a30e6d-6045-4f17-8d7f-b830684361b0",
                "categoryCode": "CTPT",
                "description": "[\"Giá Phòng từ 1700k đến xem đảm bảo ưng ý, cam kết hình đúng với thực tế\",\"Phòng mới sửa chữa cuối tháng 7/2022, địa chỉ 48/13 Lương Thế Vinh Phường Tân Thế Hòa, Q.Tân Phú, nhà hẽm xe hơi lộ giới 5m .\",\"Diện Tích 12m + 8m ( gác lững )\",\"Phòng có tolet riêng, cửa sổ, ban công, có phòng dưới trệt\",\"Cho nấu ăn trong phòng, Ở được 2-4 người, bạn bè lại chơi thoãi mái.\",\"Miễn phí internet, wifi, truyền hình cáp, Camera 15 cái ( an ninh quan sát không góc chết )\",\"Để xe trong sân nhà thoáng mát có bảo vệ coi 24/24\",\"Vị trí gần Đầm Sen, thuận tiện qua lại Q.6, Q.11, Tân Phú\",\"Điện 3,5k/ 1 ký, nước 70k / 1 người, xe 100k/ 1 chiếc .\",\"Xe để sân sau nhà có người quản lý và trông coi ( không chung chủ ) giúp bạn có cảm giác an toàn, thoải mái\",\"LH : 0938.864.405 ( Cường )\"]",
                "userId": "4b2610e1-b53c-4b21-85bb-38ef6e71ade5",
                "overviewId": "843c679f-cdf3-4241-b259-dfe050501758",
                "imagesId": "b5a636c1-cc9d-4b45-8d1b-f2b9692941b0",
                "createdAt": "2024-06-27T05:05:09.497Z"
            },
            {
                "id": "dd403366-fb93-4f9d-8ff4-c77e1644cc20",
                "title": "Cho thuê phòng cao cấp, đầy đủ tiện nghi, như căn hộ, ngay trung tâm Quận 10",
                "star": "5",
                "labelCode": "7994",
                "address": "Địa chỉ: 128 Đường Thành Thái, Phường 14, Quận 10, Hồ Chí Minh",
                "attributesId": "950ae7e7-bc4a-4231-bc3c-71e917dd8d2f",
                "categoryCode": "CTPT",
                "description": "[\"Cho thuê phòng đẹp trung tâm Quận 10 tiện nghi:\",\"- Địa chỉ 1: 7A/19/19 Thành Thái, P.14, Q.10.\",\"- Địa chỉ 2: 128 Thành Thái, P.12, Q. 10\",\"Cho thuê phòng trọ nằm cạnh siêu thị Sài Gòn, ngân hàng, gần ngay ngã tư 3/2- Thành Thái - Nguyễn Tri Phương. Gần đại học Kinh Tế TP HCM, Bách Khoa TP HCM, Y Dược. Giao thông thuận tiện, gần chợ trạm xe bus.\",\"Mặt tiền nhà đẹp, hẻm trước nhà 8m xe hơi quay đầu được\",\"Vị trí trung tâm thành phố giáp ngay Quận 1, Quận 3, Tân Bình, Phú Nhuận. Cho bạn thuận tiện trong công việc.\",\"Nhà có thang máy, chỗ để xe rộng rãi.\",\"Phòng rộng từ 22m2 - 35m2, được trang bị đủ tiện nghi như: (Máy lạnh, tivi, giường nệm, tủ lạnh... ) thiết bị cao cấp mới mua đem lại sự tiện nghi và thoải mái trong căn phòng của bạn, ban chỉ việc xách quần áo đến và ở.\",\"Giá thuê chỉ từ 4.5 triệu - 7 triệu/tháng. \",\"Chúng tôi cam kết tuyệt đối với bạn rằng! Hình chụp như thế nào thì phòng của bạn như thế đó. Thậm chí có thể đẹp hơn trong thực tế nếu bạn tới xem trực tiếp.\",\"Liên hệ: A. Khang 0938297275 hoặc 0938. 111. 005\"]",
                "userId": "4690ba39-8e3c-4a2c-87e5-4139e8865f4b",
                "overviewId": "d1f9389c-cc4a-4ccb-9e52-e1cdcd1ec966",
                "imagesId": "3b452dc1-c36a-4a99-aaad-d239d39b1d37",
                "createdAt": "2024-06-27T11:34:10.598Z"
            },
            {
                "id": "aa56cc32-42a4-48bb-b2af-88cf7daa6acd",
                "title": "Chỉ 3.9 Triệu, Phòng Rộng Rãi, Đầy Đủ Nội Thất Cơ Bản, Giảm ngay 10% tiền nhà tháng đầu!",
                "star": "4",
                "labelCode": "899A",
                "address": "Địa chỉ: 74 Đường Xuân Diệu, Phường 4, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "f1be729c-d0cc-4626-8348-6be47cefb5e1",
                "categoryCode": "CTPT",
                "description": "[\"CÒN DUY NHẤT 1 PHÒNG CÓ NỘI THẤT ĐẦY ĐỦ.\",\"GIÁ CHỈ 3 TRIỆU 900K\",\"Mình chính chủ cho thuê nha!\",\"————————————————\",\"MÔ TẢ PHÒNG\",\"- Phòng rộng rãi, thoáng mát, có gác, có cửa sổ lớn.\",\"- Full nội thất: tủ quần áo, gối nệm, máy lạnh, kệ bếp, WC riêng...\",\"- Có chỗ để xe, giờ tự do, không chung chủ.\",\"- Camera 24/24, cửa khoá vân tay, KV an ninh.\",\"————————————————\",\"VỊ TRÍ:\",\"- Gần Sân Bay Tân Sơn Nhất chỉ 5 phút.\",\"- Ngay sát bên Trường Cao Đẳng Lý Tự Trọng TPHCM.\",\"- 1 phút tới Trường Trung cấp Tài Chính - Kế Toán\",\"- 5 phút tới Trường ĐH Tài Chính Marketing\",\"- 7 phút tới Trường ĐH Bách Khoa.\",\"- 2 phút ra Chợ Hoàng Hoa Thám và Coop Food.\",\"- Di chuyển qua Phú Nhuận, Quận 10 chỉ 5-7 phút.\",\"- Bước xuống đường là vô vàn tiện ích, quán ăn khắp nơi.\",\"————————————————\",\"CHI PHÍ SINH HOẠT:\",\"- Điện 3.500/kw\",\"- Nước 100.000/người\",\"- Chỗ để xe Free\",\"- Có Wifi đầy đủ.\",\"————————————————\",\"“CAM KẾT HÌNH THẬT, NẾU HÌNH KHÔNG ĐÚNG TẶNG NGAY 2 TRIỆU VÌ CÔNG ĐẾN XEM”\",\"————————————————\",\"Địa chỉ: 74 Xuân Diệu, P.4, Tân Bình\",\"Xem phòng liên hệ mình chủ nhà nhé!\",\"(Có hoa hồng tốt cho MG, miễn đăng tin quảng cáo)\"]",
                "userId": "058a1187-e773-456d-bf41-9c35ef64e725",
                "overviewId": "bd9595c7-3c48-46d0-b58c-fdaa4102ba8b",
                "imagesId": "6fff2429-fc48-488e-af54-665f8a480df0",
                "createdAt": "2024-06-29T16:07:11.418Z"
            },
            {
                "id": "d8157af0-b84e-4a29-946f-0611dc947968",
                "title": "CHO THUÊ PHÒNG TRỌ GIÁ SIÊU RẺ GẦN KHU CÔNG NGHIỆP POUYUEN",
                "star": "4",
                "labelCode": "5653",
                "address": "Địa chỉ: 1665 Đường Tỉnh Lộ 10, Phường Tân Tạo A, Quận Bình Tân, Hồ Chí Minh",
                "attributesId": "e01255e7-3d25-4cdf-99a6-169837a42a7d",
                "categoryCode": "CTPT",
                "description": "[\"+Gần khu công nghiệp Pouyuen và khu công nghiệp Tân Tạo\",\"+Có wifi\",\"+Có gác lửng rộng rãi với diện tích 4*1,97=7,88m2\",\"+Phòng trọ sạch sẽ\",\"+Diện tích 4m*3m=12m2\",\"+Có nước máy\"]",
                "userId": "660076aa-fab4-4937-a249-0219a75dfecd",
                "overviewId": "e01dae5c-2f71-4ed6-8618-fa09efb4db5a",
                "imagesId": "aba9a23b-139d-4198-ab4e-7ac11af713b3",
                "createdAt": "2024-06-28T03:44:12.338Z"
            },
            {
                "id": "c4306d4d-b58e-40cb-aad3-ae52ef75e660",
                "title": "Căn hộ mới xây 30m2 full nội thất - đường D2 Bình Thạnh",
                "star": "4",
                "labelCode": "FDBE",
                "address": "Địa chỉ: 213/8 Đường Nguyễn Gia Trí (D2), Phường 25, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "4f862ad1-aeb4-462e-b3ae-1007bb4da6b0",
                "categoryCode": "CTPT",
                "description": "[\"PHÒNG CHO THUÊ SẠCH ĐẸP, AN NINH, TIỆN NGHI ĐƯỜNG NGUYỄN GIA TRÍ (D2) – BÌNH THẠNH\",\"Chào cả nhà,\",\"Nhằm ổn định nơi ở mới cho các bạn tân sinh viên 2022 cũng như người đi làm, tòa nhà bên mình còn các căn hộ studio cho mọi người lựa chọn như sau:\",\"- Địa chỉ: 213/8 Nguyễn Gia Trí (D2 cũ), P.25, Q.Bình Thạnh, TP. HCM\",\"Cách Đại học: Hutech 100m (đi bộ đi học), Giao Thông Vận Tải (100m), Ngoại Thương (100m), UEF (300m), Hồng Bàng (300m)\",\"- Diện tích:\",\"28m2, 30m2, 33m2, 40m2\",\"Giá thuê:\",\"5,000,000 - 6,200,000/ tháng\",\"Có thể ở từ 4 – 5 người/ phòng\",\"- Tiện ích căn phòng:\",\"Máy lạnh 1,5 ngựa tiết kiệm điện\",\"Tủ lạnh\",\"Máy giặt (ở hành lang)\",\"Có chỗ phơi đồ rộng rãi, thoáng mát\",\"Tủ quần áo gỗ\",\"Cửa sổ thoáng mát\",\"Bếp nấu ăn + bồn rửa chén\",\"Tủ chén treo tường\",\"Toilet riêng trong phòng + thiết bị vệ sinh hiện đại\",\"Tầng đúc kiên cố rộng 12m2 trong phòng\",\"Wifi riêng cho từng phòng, rất mạnh\",\"-Tiện ích tòa nhà:\",\"Có đội ngũ bảo vệ tòa nhà 24/24\",\"Camera an ninh khắp tòa nhà đảm bảo an ninh tuyệt đối\",\"Có đội ngũ quản lý toà nhà sẵn sàng hỗ trợ\",\"Thang máy phân tầng hiện đại\",\"Giờ giấc tự do\",\"Dịch vụ vệ sinh tòa nhà 3 lần/ tuần miễn phí, đảm bảo luôn sạch sẽ, gọn gàng, ngăn nắp\",\"Điện: 4k/kw; nước: 100k/ người/ tháng; giữ xe: 150k/ xe/ tháng\",\"Mời cả nhà nhanh tay đặt phòng!\",\"Xin mời liên hệ:\",\"093 510 1516 (Ms Đào) ; 090 1377 959 (Mr. Huy)\"]",
                "userId": "0852ac9b-d659-4ff8-bfa8-93f245858bb8",
                "overviewId": "01cf2ad1-6db3-4b75-aee4-c11cdce1476b",
                "imagesId": "9c810512-099b-4b4d-b0f2-65ca61c1fe69",
                "createdAt": "2024-06-25T18:11:13.286Z"
            },
            {
                "id": "54d17218-19cc-449e-975e-617fb2daeb5c",
                "title": "PHÒNG SLEEP BOX FULL TIỆN NGHI DÀNH CHO CÁC BẠN SINH VIÊN BÌNH THẠNH, HUTECH, NGOẠI THƯƠNG, GTVT",
                "star": "4",
                "labelCode": "FDBE",
                "address": "Địa chỉ: 69/38/11 Đường D2, Phường 25, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "99cdeac2-099f-4b2d-abaf-f52be3ed0857",
                "categoryCode": "CTPT",
                "description": "[\"Sleepbox đầy đủ tiện nghi riêng tư an ninh 24/24.\",\"KTX sleepbox cao cấp Nguyễn Gia Trí (D2 cũ) Bình Thạnh ngay Hutech.\",\"Xách vali vào ở ngay.\",\"Cách đại học Hutech 250m.\",\"Cách đại học Ngoại Thương 350m.\",\"Cách đại học GTVT 400m.\",\"Ưu đãi tháng đầu chỉ còn 1.400.000đ cho 10 bạn đăng kí sớm nhất\",\"Giá bình thường các tháng 1tr8/tháng/người (Bao chi phí điện nước, wifi, máy lạnh, nước uống, rác, ).\",\"Vị trí đẹp thuận lợi:\",\"- Ngay sau trường ĐH Hutech.\",\"- Khu vực đông dân cư.\",\"- Gần các trung tâm thương mại lớn.\",\"- View nhìn ra Landmark 81.\",\"- Thuận tiện di chuyển cầu SG, Xa Lộ HN, Q. 9, Phú Nhuận, Gò Vấp phòng * được trang bị sẵn đầy đủ tiện ích:\",\"- Giường riêng biệt, nệm cao su + drap.\",\"- Tủ quần áo, tủ đồ riêng.\",\"- Đèn học, ổ cắm điện.\",\"- WC riêng, sạch sẽ.\",\"- Khu vực bếp nấu ăn chung (Đầy đủ dụng cụ - lò vi sóng - bếp - xoong nồi... ).\",\"- Nước uống I - On miễn phí\",\"- Wifi siêu tốc.\",\"- Ra vào cửa vân tay.\",\"- Bảo vệ, quản lý 24/7.\",\"- Dọn vệ sinh trong phòng hằng ngày\",\"- Thang máy, máy giặt, nơi phơi đồ riêng.\",\"- Hệ thống camera an ninh.\",\"- Chỗ sinh hoạt luôn được vệ sinh sạch sẽ.\",\"Địa chỉ: CS1: 69/38/11 Nguyễn Gia Trí, P. 25, Bình Thạnh..\"]",
                "userId": "82764628-b70d-4184-9a94-8bbccaf4768a",
                "overviewId": "c1d7daa7-8513-4b62-bba0-b229ecea4790",
                "imagesId": "02387fab-f4e0-4386-976a-b1f2f25e8453",
                "createdAt": "2024-06-26T22:34:14.208Z"
            },
            {
                "id": "28a62183-f02f-489e-9202-7b1496e9f93c",
                "title": "Phòng trọ mới, sạch đẹp, ngay trung tâm, giá rẻ, chính chủ.",
                "star": "4",
                "labelCode": "7994",
                "address": "Địa chỉ: 358/4 Đường Điện Biên Phủ, Phường 11, Quận 10, Hồ Chí Minh",
                "attributesId": "833dd74a-b049-4374-a652-c0a3188152fe",
                "categoryCode": "CTPT",
                "description": "[\"Cho thuê phòng trọ, lầu đúc, sạch đẹp,có sân thượng, ngay trung tâm, đối diện bệnh viện Bình Dân, gần trường học, chợ Vườn Chuối, thuận tiện đi lại cho người đi làm, đi học.Có wifi, truyền hình cáp, nước lạnh, nước nóng năng lượng mặt trời, nhà vệ sinh trong phòng, có chỗ để xe trong nhà không tốn phí( mỗi người một chiếc xe không tốn tiền gửi xe ), an toàn.\",\"Khu vực yên tĩnh, an ninh.\",\"Đồng hồ điện, nước riêng.Có thể ở 1 hoặc 2 người.\",\"-Phòng 24m2 có cửa sổ, giá 3.500.000đ/phòng/tháng ( ở 1 hoặc 2 người).\",\"PHÒNG TRỐNG-DỌN VÀO Ở NGAY.\",\"Liên hệ cô Bích Thủy : 0983.344.682\",\"Xem phòng tại 358/4 Điện Biên Phủ P11 Q10 (Khi đến xem phòng xin gọi điện trước).\"]",
                "userId": "1062a2e3-6214-41ca-ad61-fe5639d172b6",
                "overviewId": "5a83857d-9c55-471b-946f-ee69bee0ce17",
                "imagesId": "a10dffc8-ef3f-45ad-80d3-2937bf52c6fb",
                "createdAt": "2024-06-27T09:39:15.026Z"
            },
            {
                "id": "ac643877-10a1-4297-bf81-11fa0a7433a8",
                "title": "Phòng máy lạnh, giường, máy giặt đầy đủ tiện nghi",
                "star": "4",
                "labelCode": "159B",
                "address": "Địa chỉ: 350 Đường Huỳnh Tấn Phát, Phường Bình Thuận, Quận 7, Hồ Chí Minh",
                "attributesId": "66dc7444-81d8-4d99-84b6-72550bd608bf",
                "categoryCode": "CTPT",
                "description": "[\"Bên mình còn 1 phòng dịch vụ bên Quận 7\",\"1.) Phòng có máy lạnh, giường, máy giặt giá 2tr3 . Địa chỉ: 350 Huỳnh tấn phát Q7\",\"Liên hệ: 0931313570\"]",
                "userId": "da61a1d5-9ddd-44cb-bbaf-41ddea8a0b26",
                "overviewId": "c22747fa-222d-49db-9080-d596c9532a58",
                "imagesId": "003915c5-cdfd-4f8c-ab94-5a75de719241",
                "createdAt": "2024-06-27T01:23:15.998Z"
            },
            {
                "id": "1b206d00-d44d-4c88-ac2a-5efe96a45930",
                "title": "Ở ghép trọn gói 700k gần Lotte Mart",
                "star": "4",
                "labelCode": "159B",
                "address": "Địa chỉ: 34 Phố số 36, Phường Tân Quy, Quận 7, Hồ Chí Minh",
                "attributesId": "02cfdcc3-9cbc-4557-b9e2-eb85fe695153",
                "categoryCode": "CTPT",
                "description": "[\"Đến Homestay Hoàng Phúc – hệ thống Kytucxa Q7 rẻ nhất Sài Gòn với những căn phòng đẹp lung linh chuẩn 2 sao, đa dạng tiện nghi và bao trọn toàn bộ các chi phí (cam kết 100% không phát sinh).\",\"CHỈ 9️⃣0️⃣0️⃣.0️⃣0️⃣0️⃣/ THÁNG( KM 200K tháng đầu chỉ còn 7️⃣0️⃣0️⃣.0️⃣0️⃣0️⃣/ THÁNG )\",\"TIỆN ÍCH NỔI TRỘI TẠI ĐÂY:\",\"Giường tầng riêng tư, có tủ đồ, móc treo thông minh\",\"Máy lạnh inverter, wifi tốc độ cao\",\"Nhà vệ sinh riêng, sạch sẽ\",\"Nhân viên dọn phòng hằng ngày\",\"Tự do dùng máy giặt,bình lọc nước\",\"Khu để xe rộng, được camera giám sát.\",\"⏰ ⏰ môi trường văn minh\",\"Ngoài ra còn có:\",\"Camera An ninh, quản lý tâm huyết.\",\"Không gian bếp lớn đầy đủ thiết bị.\",\"Có khu phơi quần áo riêng.\",\"Vị trí ở trung tâm, mức sống dễ chịu, thuận lợi đi lại và ăn uống và rất nhiều các chi nhánh để các chọn lựa gần chỗ làm nơi học.\",\"Địa chỉ các cơ sở chi nhánh KTX:\",\"️CN1: 34 đường 36, P. Tân Quy, Q.7\",\"Các chi nhánh khác:\",\"️CN2: 1134/14A Huỳnh Tấn Phát, Q.7\",\"️CN3: Hẻm 350 Huỳnh Tấn Phát, Q.7\",\"️CN4: 233/11/6 Nguyễn Trãi, P2, Q.5\",\"️ CN5: 84 Nguyễn Tất Thành, Q.4\",\"CÒN CHẦN CHỜ GÌ NỮA NHANH TAY LIÊN HỆ CHO MÌNH 1 CHỖ\",\"Điện thoại: 0931313570\"]",
                "userId": "91e6c55b-db5d-4555-8ca6-ff6016cdb4ca",
                "overviewId": "6dfba712-3ef7-4544-9f69-6d91fb43eb94",
                "imagesId": "56e71d2d-ae7a-46a5-aa71-df939244f7f2",
                "createdAt": "2024-06-27T00:59:16.972Z"
            },
            {
                "id": "ab72e9ad-1316-42df-a99f-0bd4ecc32d5b",
                "title": "Phòng trọ cho thuê ngắn hạn hoặc dài hạn đầy đủ nội thất, tiện nghi vào ở ngay",
                "star": "4",
                "labelCode": "1E3C",
                "address": "Địa chỉ: 336/10 Nguyễn Văn Luông, Phường 12, Quận 6, Hồ Chí Minh",
                "attributesId": "5a6ec001-33a1-423e-9c1a-917d79393989",
                "categoryCode": "CTPT",
                "description": "[\"Cho thuê phòng trọ ngắn hạn hoặc dài hạn trang bị sẵn full nội thất rất tiện nghi, có thang máy, vào ở ngay.\",\"Vị trí: cách vòng xoay Phú Lâm 200m, gần ngã tư Hậu Giang, gần chợ lớn, khu ăn uống sầm uất. \",\"Nội thất: tivi, tủ lạnh, máy lạnh, giường, nệm, tủ quần áo, bàn trang điểm,... toilet riêng.\",\"Phòng nhỏ 20m2 (1 giường rộng), giá 3.8 triệu/tháng (ở 2 người)\",\"Phòng lớn 40m2 (2 giường rộng), giá 6 triệu/tháng (ở 4 người)\",\"Điện 3,5k, nước 100k/người, xe 100k/chiếc.\",\"Vệ sinh: 100k. \",\"Liên hệ: Anh Cảnh - 0913635257 - 0913665257\",\"Hoặc: 028.38858278\",\"Tất cả giảm thêm 10% nếu ở trên 3 tháng.\"]",
                "userId": "fa009414-68d7-4d9c-b9f1-78b567934498",
                "overviewId": "cb13acfb-9326-404d-a079-3e726d52810a",
                "imagesId": "a60cd39d-4089-43a4-8c6a-be66f7ff26c8",
                "createdAt": "2024-06-27T03:21:17.997Z"
            },
            {
                "id": "1411d8fb-5763-428a-b471-e507ed45c83d",
                "title": "PHÒNG CHO THUÊ NGAY LOTTE Q.7 - CHỈ TỪ 3TR - BAO GIÁ TỐT - Alo 0988.373.731",
                "star": "4",
                "labelCode": "159B",
                "address": "Địa chỉ: 80 Đường số 3, Phường Tân Kiểng, Quận 7, Hồ Chí Minh",
                "attributesId": "848a9447-471f-4abb-aa83-b5671f18313c",
                "categoryCode": "CTPT",
                "description": "[\"Các tiện ích chỉ có ở tại Fullhouse ngay Lotte Q.7. 100% cư dân đều đã chích vacxin 2 mũi và dân trí cao, tuân thủ 5K và pháp luật.\",\"Ngay Lotte Q.7 (đi bộ 2 phút đến đại siêu thị)! Alo ngay: 0988.373.731 Ms Hòa.\",\"Ngay dưới tòa nhà là \\\"Thiên đường Ốc\\\" đủ các món ăn ngon\",\"Căn phòng dành cho bạn thì đầy đủ tiện nghi, tiết kiệm điện và bảo vệ môi trường với hệ đèn LED - Nước nóng năng lượng mặt trời - Máy lạnh Inverter - WC và bếp riêng tiện nghi và tự do.\",\"Tòa nhà luôn được vệ sinh sạch sẽ để bảo vệ sức khỏa toàn bộ dân cư.Tòa nhà xài hệ thống NLMT và máy lạnh Inverter giúp tiết kiệm điện.\",\"Tòa nhà 8 tầng mới xây sạch,đẹp,văn minh thoáng mát, an ninh. Liền kề 5 phút đến Q1, Q4, Q5, Q8, Crescent Mall, SC Vivo, vị trí vàng đẹp Q. 7...Thuê chỗ ở bây giờ cần phải đảm bảo an toàn PCCC tuyệt đối. Tòa nhà căn hộ cho thuê cao cấp của chúng tôi có thẩm duyệt PCCC và đã nghiệm thu PCCC kèm theo bảo hiểm đảm bảo an toàn cho toàn bộ cư dân sống và làm việc tại đây, có an cư, an toàn mới lạc nghiệp.\",\"Giá từ 3.0 - 4.5 triệu/tháng, bao giá tốt khắp khu vực.\",\"Alo ngay: 0988.373.731 Ms Hòa.\",\"Đảm bảo 100% sự hài lòng.\",\"80 Đường Số 03, P. Tân Kiểng, Q. 7 - LH: 0988.373.731 Ms Hòa.\"]",
                "userId": "b7f5831e-e18d-44a4-94b3-8b5058bd95a7",
                "overviewId": "b9539041-9d7c-404b-8fbd-6f954c59ad3d",
                "imagesId": "7c34a160-1428-4531-80ac-f1e01aee6f14",
                "createdAt": "2024-06-27T02:20:18.867Z"
            },
            {
                "id": "b95b37f9-cc1d-413c-a86a-df45a2daa4b0",
                "title": "Cho thuê phòng 20m2 nhà mới xây tại 32/40/38 Đường Bùi Đình Túy, Phường 12, Quận Bình Thạnh",
                "star": "3",
                "labelCode": "FDBE",
                "address": "Địa chỉ: 32/40/38 Đường Bùi Đình Túy, Phường 12, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "4deaab7d-a0ef-40de-a9b2-454eae1c3dec",
                "categoryCode": "CTPT",
                "description": "[\"- Nhà mới xây xong, nội thất đẹp, hiện đại\",\"- Phòng đầy đủ tiện nghi, mát mẻ\",\"- Có máy lạnh, toilet khép kín trong phòng\",\"- Có giường hộp hiện đại, nệm\",\"- Có bàn làm việc, học tập, tủ lạnh\",\"- Có tủ quần áo rộng rãi\",\"- Giặt và phơi quần áo sân thượng, có máy giặt\",\"- Free wifi, nước nóng lạnh năng lượng mặt trời\",\"- Vị trí yên tĩnh, phù hợp cho sinh viên học hành, người đi làm nghỉ ngơi sau giờ làm\",\"- Gần chợ, siêu thị, phòng gym, nhiều tiện ít xung quanh, giờ giấc tự do\",\"- Phòng ban công\",\"- Điện 3,5k/1kw. Nước 100k/ người\"]",
                "userId": "93e4dbda-0f8c-4d90-9652-d75151b48115",
                "overviewId": "1a7f1dbb-a6e1-463a-902e-4632bf004cdb",
                "imagesId": "08af7b25-9bdd-4bf0-a9ab-f411aece8899",
                "createdAt": "2024-06-24T00:42:19.855Z"
            },
            {
                "id": "ad1da837-c755-42a1-9117-2d0dbccb9dff",
                "title": "Phòng sạch, đẹp 16m2, có sẵn nội thất chỉ từ 3,2 Triệu đến 3,5 Triệu/tháng tại Đinh Bộ Lĩnh, Phường 26, Bình Thạnh",
                "star": "3",
                "labelCode": "FDBE",
                "address": "Địa chỉ: Đường Đinh Bộ Lĩnh, Phường 26, Quận Bình Thạnh, Hồ Chí Minh",
                "attributesId": "81f6749e-7ada-40ae-b71f-99d2536fb1cc",
                "categoryCode": "CTPT",
                "description": "[\"Cho thuê phòng trọ mới đẹp diện tích 16m2 tại hẻm 6m Đường Đinh Bộ Lĩnh, Phường 26, Quận Bình Thạnh\",\"Phòng gồm có wc riêng biệt sạch sẽ, sinh hoạt thuận tiện. Phòng có cửa sổ và thông gió mát mẽ, thoáng\",\"Có sẵn một số nội thất như: giường, tủ, máy quat, máy lạnh, máy năng lương,\",\"Miễn phí rác, bãi xe.\",\"Giờ giấc sinh hoạt tự do\",\"Khu an ninh, xung quanh có đầy đủ các tiện ích. Cách trung tâm chỉ 5 phút\",\"Giá thuê chỉ: 3.200.000đ/tháng đến 3.500.000đ/tháng\",\"Liên hệ xem phòng: 0903934756\"]",
                "userId": "4eefda60-41c0-48d9-b27c-78183d9762c4",
                "overviewId": "05b47d5b-2b31-4ee2-bd0f-48458697d552",
                "imagesId": "e3ad4097-a54c-4ff0-9e76-3a3747336e9e",
                "createdAt": "2024-06-23T10:58:20.763Z"
            },
            {
                "id": "ad802753-5adf-4d06-b96e-4bf821e41a6e",
                "title": "Phòng 2 triệu tại q7, phòng mới, yên tĩnh, phòng riêng biệt, giờ giấc tự do",
                "star": "3",
                "labelCode": "159B",
                "address": "Địa chỉ: Phường Phú Mỹ, Quận 7, Hồ Chí Minh",
                "attributesId": "6cf55a93-f5e5-46ee-bea2-3988d9812162",
                "categoryCode": "CTPT",
                "description": "[\"Phòng trọ giá bình dân tại Q7\",\"▪︎ phòng 1tr6 không có gác ( có giường)\",\"▪︎ phòng 1tr9 có gác\",\"▪︎ phòng 2tr có gác, có ban công\",\"Địa chỉ: hẻm 77/49A đường chuyên dùng 9, phú mỹ q7, tphcm, ( gần siêu thị Coopmart)\",\"Phòng có vệ sinh và nấu ăn riêng biệt, không chung chủ\",\"phòng theo thiết kế cầu thang dễ đi, phòng nhỏ xinh, sạch sẽ, an ninh, phòng đã gắn 1 số thiết bị cần sử dụng như: gương, chỗ để bàn chài đánh răng, móc, có chỗ nấu ăn, kệ chén...\",\"điện 3/kg, nước 20khoi, rác 20k, wifi miễn phí, nhà xe có bảo vệ trông nom\",\"- Giờ giấc tự do\",\"- Điện thoại: 0909634270 Kim Cúc\",\"- Lưu ý: phòng chỗ mình k nuôi thú cưng, k kéo bạn bè về ăn nhậu hát hò.\",\"Cọc 1 tháng\"]",
                "userId": "25474c4c-f3db-47b1-b54c-2f8663e02311",
                "overviewId": "55aebd63-c286-4ee6-b5d5-a6cadd226f40",
                "imagesId": "668968ce-3821-4cb1-a3d7-c73d188aaa4d",
                "createdAt": "2024-06-26T07:28:21.888Z"
            },
            {
                "id": "a9fee67d-f9cb-4b02-9c67-08c274c5eb3a",
                "title": "Cho thuê phòng trọ đầy đủ nội thất, đường 3/2, khu Kỳ Hòa, Quận 10",
                "star": "3",
                "labelCode": "7994",
                "address": "Địa chỉ: 181/36 Đường số 3/2, Phường 11, Quận 10, Hồ Chí Minh",
                "attributesId": "8ac00dc8-b966-40ff-8556-a1aa5ba9b3e0",
                "categoryCode": "CTPT",
                "description": "[\"Chính chủ cho thuê phòng rộng khu trung tâm, an  ninh, yên tĩnh, hẻm chính 7m, tiện đi lại, phòng rộng 22m2. Tiện nghi đầy đủ như khách sạn, máy lạnh, nước nóng, tivi LDC, tủ lạnh, giường tủ, bàn ghế...\",\"Giờ giấc tự do, có chỗ để xe.\",\"- Địa chỉ: 181/36 Đường 3/2, P.11, Quận 10.\",\"Giá thuê: 5 triệu/tháng.\",\"Liên hệ: 0919.990.528 Chị Vân - Chính chủ\"]",
                "userId": "300f9757-1b59-4c45-a5ce-81ee19d07ece",
                "overviewId": "929d2233-4781-4bd2-8ab6-bf196340f0ea",
                "imagesId": "30b775e2-a0fc-4b7a-bcbb-0439abe15a99",
                "createdAt": "2024-06-28T04:28:23.130Z"
            },
            {
                "id": "a2032b58-9068-405a-9f4f-16ccf6bacb92",
                "title": "Cho thuê nhà trọ mặt tiền 8m, giá rẻ, sạch, đẹp, tự do..chỉ còn 1 căn duy nhất",
                "star": "2",
                "labelCode": "BF5B",
                "address": "Địa chỉ: P02- 1874/11/6 Đường Lê Văn Lương, Xã Nhơn Đức, Huyện Nhà Bè, Hồ Chí Minh",
                "attributesId": "b9115151-f890-4767-b2fb-d6ad77690258",
                "categoryCode": "CTPT",
                "description": "[\"Nhà trọ 2 mặt tiền đường 8m, 27m2 .\",\"Đúc lửng, WC rộng, bếp riêng biệt trong phòng, trần la phông thạch cao, ốp, lát gạch men, sạch sẽ, rộng rãi thoáng mát, Phòng riêng mới, sinh hoạt độc lập, tự do, xe ô tô vào tận cửa. \",\"Gần khu công nghiệp Hiệp Phước, Long Hậu, gần chợ Nhơn Đức.Cách Nguyễn Văn Linh 6km, qua cầu Rạch Tôm 200m. Phòng đang trống vào ở ngay, HĐ 1 năm, cọc 1 tháng, trả trước tiền thuê, điện 2,500/kw, nước 17k/m3. ưu tiên nhân viên văn phòng, sinh viên\",\"Địa chỉ: 1874/11/6 Lê Văn Lương, xã Nhơn Đức, Nhà Bè ( Phòng 04)\"]",
                "userId": "a9380bc4-a6af-44ad-a186-7d21d3531b71",
                "overviewId": "78ada531-4f19-4620-b710-756b0a6562d7",
                "imagesId": "7055958d-2312-4831-bc53-612188ee436d",
                "createdAt": "2024-06-23T19:21:24.422Z"
            },
            {
                "id": "f5155a33-3e02-4305-9498-e3d09c8e6103",
                "title": "Cho thuê nhà nguyên căn Đường Võ Thị Thừa",
                "star": "4",
                "labelCode": "5BEB",
                "address": "Địa chỉ: 77/18 Võ Thị Thừa, Phường An Phú Đông, Quận 12, Hồ Chí Minh",
                "attributesId": "7ea17d5d-ae3d-446b-9092-e14e23210800",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê nhà nguyên căn 1 triệt 3 lầu diện tích 4x14, có chỗ đậu xe ô tô, có thể làm vp kinh doanh. Nhà hướng Tây ven sông Sài Gòn cực thoáng mát. Liên hệ chủ nhà để được biết thêm chi tiết và xem nhà: 0915476117(Ngân)\"]",
                "userId": "3895c2e8-5b5f-484c-bbbd-62e89663a258",
                "overviewId": "d1cd9de2-cca9-4618-be2d-594d2f2024c3",
                "imagesId": "c195599f-4e2f-4ac5-888d-befaa633120d",
                "createdAt": "2024-06-23T15:38:25.962Z"
            },
            {
                "id": "025e7f56-9812-4242-87ec-b76b890b8a57",
                "title": "Cho thuê nhà đường rộng xe hơi vào tận nhà tại 1/35 Đường Chiến Lược, Phường Bình Trị Đông, Bình Tân",
                "star": "2",
                "labelCode": "460F",
                "address": "Địa chỉ: 1/35 Đường Chiến Lược, Phường Bình Trị Đông, Quận Bình Tân, Hồ Chí Minh",
                "attributesId": "3c239697-2734-4820-8329-918090cdd482",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê nhà Hẻm xe hơi\",\"diên tích : 4mx12m ba tầng\",\"1 trệt 2 lầu 1 sân thượng\",\"bao gồm 1 phòng khách , 1 phòng bếp , 4 phòng ngủ ,4 tolet, 1 phòng thờ , 1 sân thượng , nước nóng năng lượng mặt trời ,\",\"Hẻm cụt 6m ,2 xe hơi tránh nhau\",\", nhà 1 mặt ( dối diện ao sen ) đậu xe hơi thoải mái ,\",\"Khu vực an ninh yên tỉnh\",\"Thích hợp cho gia đình lớn hoặc 2 gia đình nhỏ , buôn bán online …\",\"Giá thuê 10tr/tháng đặt cọc 2 tháng .\",\"miễn tiếp báo đài , môi giới .\"]",
                "userId": "9a140fbc-edaa-4192-a156-0f8fef33521c",
                "overviewId": "70e89247-81bb-4c8c-af6f-0162dff02a37",
                "imagesId": "a97caf2a-90c8-4e3a-b59b-f39b1e5e5f7f",
                "createdAt": "2024-06-29T02:49:27.520Z"
            },
            {
                "id": "77e6274a-5ba2-4590-bf52-a5a5bff5acfe",
                "title": "Cho thuê nhà nguyên căn 689/21 Trần Xuân Soạn, Quận 7 giá 5tr/tháng",
                "star": "2",
                "labelCode": "2877",
                "address": "Địa chỉ: 689/21 Phố Trần Xuân Soạn, Phường Tân Hưng, Quận 7, Hồ Chí Minh",
                "attributesId": "4b06ceee-8661-48b6-8890-fc2ab1e8dc52",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê nhà nguyên căn Trần Xuân Soạn, Quận 7.\",\"- Giá 5tr/tháng.\",\"- Địa chỉ: 689/21 Trần xuân Soạn p. Tân hưng q7.\",\"- Diện tích 4x12, 1 trệt, 1 lầu, nhà nguyên, mới, gần siêu thị, bvien, trường học, gần q1, sát q4, q8...\"]",
                "userId": "2cc4773d-ada8-4e15-a8b5-c0b6d45d5099",
                "overviewId": "6b0b6e94-cd6d-42f2-bfef-4d9280d66d4f",
                "imagesId": "44cdccbd-a088-4d8a-816e-d8ead8188eb3",
                "createdAt": "2024-06-29T02:40:28.520Z"
            },
            {
                "id": "41ff523f-f4a7-414a-b975-a93a04748b90",
                "title": "Chính chủ cần bán hoặc cho thuê nhà tại Thuận An, Bình Dương",
                "star": "2",
                "labelCode": "C8B7",
                "address": "Địa chỉ: Phường An Phú, Huyện Thuận An, Bình Dương",
                "attributesId": "8fcff63d-e74e-43f5-96f4-35515345171f",
                "categoryCode": "NCT",
                "description": "[\"Do có việc chuyển công tác lên SG nên gia đình tôi cần bán hoặc cho thuê nhà diện tích 363m2, phường An Phú, Thuận An. Bình Dương. Hiện tại ngoài căn nhà đang ở thì còn có thêm 20 phòng trọ sát bên cho thuê.\",\"Giá bán là: 10 tỷ\",\"Giá cho thuê: 20 triệu/tháng\",\"LH: 0947776788\"]",
                "userId": "f3324d14-9651-472a-84d2-c1965bd07aae",
                "overviewId": "992d532f-7630-414a-b48a-40d3a9917d46",
                "imagesId": "3bdb41c3-1442-4b95-a429-b2658628492e",
                "createdAt": "2024-06-24T07:07:29.666Z"
            },
            {
                "id": "264b54df-cce1-42a5-97c6-56d3eaa0d8af",
                "title": "Cho thuê nhà Nguyên căn – Văn phòng Căn Góc đường Xe Hơi Trương Công Định, P.14, Q.Tân Bình, DT: 8x14m",
                "labelCode": "E110",
                "address": "Địa chỉ: 62/1A Đường Trương Công Định, Phường 14, Quận Tân Bình, Hồ Chí Minh",
                "attributesId": "26cf56d1-0faf-4ded-83b9-c1a31959042c",
                "categoryCode": "NCT",
                "description": "[\"Nhà Nguyên căn – Văn phòng Căn Góc 62/1A Trương Công Định, P.14, Q.TB\",\"Tôi chính chủ cần cho thuê nhà nguyên căn tầng trệt thiết kế hiện đại ngay góc ngã ba đường xe Hơi Khu Phân Lô Bàu Cát, Phường 14, Quận Tân Bình.\",\"•+ Địa chỉ: 62/1A-B Trương Công Định, Phường 14, Quận Tân Bình, TP.HCM.\",\"•+ Diện tích: Ngang 8m x Dài 14m (112 m2)\",\"️ Vị trí thuận tiện : Ngay khu Bàu Cát, gần ngã ba Trường Chinh – Trương Công Định, Quận Tân Bình, Sát ETOWN cộng hòa, Bệnh Viện Mỹ Đức, chợ Võ Thành Trang (Bà Quẹo), gần nhiều tòa cao ốc văn phòng, công ty và nhiều trường đại học ….\",\"️ Tiện ích :\",\"+ Mặt tiền tầng trệt bề ngang lớn 8m đã được thiết kế riêng biệt gồm 02 Phòng lớn với vách ngăn, trần, kính cường lực hiện đại đẹp và sang trọng, có sân để xe có mái che, có WC riêng.\",\"️ Thích hợp để ở, để kinh doanh online, mở văn phòng đại diện công ty, Văn Phòng làm việc hay kinh doanh nhiều ngành nghề …\",\"Giá rất hợp lý: 17 Triệu/tháng (Giảm sâu và cam kết không tăng giá)\",\"️️Liên hệ : 0937.554.570 A. Hoàng\",\"Từ Khoá: cho thuê nguyên căn quận Tân Bình, cho thuê tầng trệt khu Bàu Cát quận Tân Bình, Nhà cho thuê làm văn phòng quận Tân Bình, Văn phòng cho thuê hcm, văn phòng cho thuê quận Tân Bình, cho thuê văn phòng khu bàu cát. Cho thuê mặt bằng hcm, mặt bằng cho thuê hcm, cho thuê mặt bằng quận Tân Bình, Cho thuê mặt bằng Trương Công Định, mặt bằng cho thuê tân bình, mặt bằng cho thuê quận tân bình, cho thue mat bang hcm, mat bang cho thue hcm, mat bang cho thue tan binh …\"]",
                "userId": "17860658-2e32-4eb4-bfd1-de686067b188",
                "overviewId": "76e69ec1-5d8b-4cd6-a404-72034fc65c19",
                "imagesId": "3cbce443-9689-4c35-a562-5fe5bf5c6638",
                "createdAt": "2024-06-25T01:16:31.217Z"
            },
            {
                "id": "45f380a6-a72a-4980-952a-5f60e7ce358d",
                "title": "Nhà nguyên căn 1 trệt HXH 8M 269/45 Phan Huy Ích, P.14, Q.Gò Vấp, DT: 4X14M, 2PN - Tiện ở, Làm VP hoặc KD Online",
                "labelCode": "98B4",
                "address": "Địa chỉ: 269/45 Phan Huy Ích, Phường 14, Quận Gò Vấp, Hồ Chí Minh",
                "attributesId": "87ab85b8-e60a-4644-9e84-30d29f71d0a0",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê nhà nguyên căn thiết kế đẹp hoàn hảo hẻm 1 trục xe tải 8m 269/45 Phan Huy Ích, Phường 14, Quận Gò Vấp, TP. HCM. (Hẻm 1 trục 2 xe hơi tránh nhau cách Phan Huy Ích 50m)\",\"- DT: 4 x 14m, gồm: 1 trệt.\",\"+ 2 Phòng ngủ rộng thiết kế rất đẹp mới hoàn toàn, WC riêng\",\"+ Phòng khách hoặc mặt bằng để mở văn phòng kinh doanh rất rộng rãi.\",\"+ Nhà thiết kế sang trọng, hiện đại, cửa, cầu thang gỗ sang trọng.\",\"+ Khu dân cư an ninh, đông đúc, hẻm rộng 8m ô tô ra vào thoải mái.\",\"+ Rất tiện lợi cho gia đình ở, mở văn phòng công ty hay kinh doanh online ...\",\"Giá chỉ: 7.5 triệu/tháng (hình ảnh thật).\",\"LH: 0937554570 A. Hoàng.\",\"Tìm kiếm theo từ khóa: Cho thuê nhà phường 14 quận Gò Vấp , Cho thuê nhà đường Phan Huy Ích , Cho thuê nhà đường Phan Huy Ích quận Gò Vấp , Cho thuê nhà phường 14 , Cho thuê nhà đường Phan Huy Ích phường 14, Cho thuê nhà quận Gò Vấp, Nhà cho thuê Quận Gò Vấp, cho thue nha quan go vap.\"]",
                "userId": "9813b263-7236-4e34-ad57-bce1b78cc188",
                "overviewId": "30961297-92ba-4b76-89a9-298b8599f6f8",
                "imagesId": "0a7fa8dc-8cc2-4108-ad96-ebaf1fc5675e",
                "createdAt": "2024-06-24T00:49:32.518Z"
            },
            {
                "id": "b3018dbe-426f-4b68-bfcd-f050581acb04",
                "title": "Cho thuê nhà số 24 ngõ 182 Bạch Đằng, Chương Dương, Hoàn Kiếm",
                "labelCode": "A803",
                "address": "Địa chỉ: 24 ngõ 182 Bạch Đằng, Phường Chương Dương Độ, Quận Hoàn Kiếm, Hà Nội",
                "attributesId": "c750cfdb-3877-4061-8bb9-0f089f4b1d98",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê nhà 3,5 tầng, phù hợp với hộ gia đình: 3 phòng ngủ, 2 wc.\",\"Đầy đủ các tiện ích xung quanh nhà: chợ, siêu thị, trường học, ngân hàng. Ngõ thông 2 đường Bạch Đằng - Hồng Hà. Cách hồ Hoàn Kiếm 1km.\"]",
                "userId": "62e57f5b-4889-47b6-a475-a044fa272c8a",
                "overviewId": "3e6dbf24-129d-47ac-a52e-5e8367037eaa",
                "imagesId": "bc9ae64e-9e8e-4df9-9128-cf7381b743f1",
                "createdAt": "2024-06-24T02:39:33.562Z"
            },
            {
                "id": "79a9e76d-8cdb-4b4f-998c-aee493036f99",
                "title": "Cho Thuê Nhà Cấp 3 và sân 90m2 đối diện sân Sân Vận Động Quốc Gia Mỹ Đình",
                "labelCode": "A8C6",
                "address": "Địa chỉ: Phường Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội",
                "attributesId": "498b60e5-9c89-44ec-a8aa-ba1919458c4f",
                "categoryCode": "NCT",
                "description": "[\"Nhà cho thuê giá rẻ ở Ngõ 16 Đỗ Xuân Hợp\",\"Tiện tích: Điện nước, bếp và nhà vệ sinh\",\"Xung quanh rất nhiều hàng quán ăn uống, cửa hàng tiện lợi và dịch vụ\",\"Ngõ to ô tô vào được\",\"Bao gồm nội thất: Giường Tủ\",\"Diện tích bao gồm:\",\"Nhà 45m2, dài: 10m2 rộng 4.5m2\",\"Gác xép: 20m2 4.5m2, 4.5m2\",\"Sân 45m2, dài: 10m2 rộng 4.5m2\",\"Giá 5tr/ tháng\"]",
                "userId": "9598ffbc-6e10-4be1-a67c-87518f0a5cc8",
                "overviewId": "0d012d4a-77fe-43de-bd64-e9f37d591795",
                "imagesId": "5c27390e-f25b-4042-a407-c63d495404fc",
                "createdAt": "2024-06-27T16:20:34.790Z"
            },
            {
                "id": "d8b00a1d-8613-4307-9449-280abb8c1165",
                "title": "Nhà cấp 4 nguyên căn, 47/7 đường Số 2, Quận 2 - Ngay cầu SG",
                "labelCode": "2E61",
                "address": "Địa chỉ: 2, Phường Bình An, Quận 2, Hồ Chí Minh",
                "attributesId": "7988dd86-2eb8-436c-bf2c-a126969f97e0",
                "categoryCode": "NCT",
                "description": "[\"- Nhà cấp 4 nguyên căn (80m2) + gác lửng (20m2).\",\"- Đường container vào được cách nhà 10m, hẻm xe 6 chỗ vào được.\",\"- Khu dân cư trí thức, rất ít nhà cho thuê.\",\"- Cả Quận 2 (Tp Thủ Đức) không tìm được căn nào tốt hơn, không tin cứ đến check.\",\"- Ở là thích, phù hợp gia đình hoặc nhóm từ 4 - 6 người.\",\"- Quyết định nhanh thì còn, chậm thì vào ô mất lượt.\",\"- Có chỗ tập thể dục, trẻ con vui chơi siêu thích.\",\"- Trong vòng bán kính 200m có Siêu thị Co. Oop, Big C, Metro + 1 chợ truyền thống.\",\"- 02 Trường mầm non cách nhà 10 m, tiểu học, trung học cơ sở, phổ thông cách nhà 200m.\",\"- Công viên gần nhà có 05 công viên (bán kính 200m) + công viên Vinhome (qua cầu Sài gòn) - người lớn, trẻ con có full chỗ vui chơi.\",\"- Có thể dọn vào ở ngay, hợp đồng từ 12 tháng trở lên.\",\"- Gọi trực tiếp để xem nhà, không tiếp trung gian.\",\"- Liên hệ: 093 848 5116 (Cô Luật).\"]",
                "userId": "2676ea9a-e518-4b1e-a0b8-f39383267506",
                "overviewId": "23766d22-e535-4476-8cd2-61f040ddcd97",
                "imagesId": "bf0f5ec7-541b-4aad-8d6f-e8892e5ace0d",
                "createdAt": "2024-06-23T10:12:36.297Z"
            },
            {
                "id": "570b2016-5e66-45b3-9a3c-7db4850c5eed",
                "title": "Cho thuê nhà mặt tiền 24 Bùi Công Trừng, Đông Thạnh, Hóc Môn",
                "labelCode": "B967",
                "address": "Địa chỉ: Bùi Công Trừng, Xã Đông Thạnh, Huyện Hóc Môn, Hồ Chí Minh",
                "attributesId": "e807535a-c0fd-43a6-99f9-58ef48ec0160",
                "categoryCode": "NCT",
                "description": "[\"Chính chủ, cần cho thuê nhà mặt tiền\",\"Địa chỉ: 24 Bùi Công Trừng, Đông Thạnh, Hóc Môn\",\"Diện tích: 3.5 x 9, xây 1 trệt 2 lầu.\",\"Trệt trống suốt có 1 WC\",\"Lầu 1&2 : mỗi lầu 1 phòng ngủ và 1 phòng khách, 1 WC\",\"Giá thuê: 6 triệu/ tháng, cọc 2 tháng.\",\"Cho thuê ngắn hoặc dài hạn đều được\",\"Vị trí: Gần chùa Pháp Bửu, gần nhà thờ, chợ, trường học, siêu thị mini... Trục chính kết nối Hóc Môn với Quận 12, Củ Chị và Gò Vấp.\",\"Phù hợp kinh doanh: Salon tóc, spa, shop, tiệm thuốc, văn phòng nhà đất, ở gia đình, ....\",\"Liên hệ: 0902.973.753 gặp a Thủ\"]",
                "userId": "c7cef3e1-7452-4c3a-8ab7-fd3af3f8124c",
                "overviewId": "a0c95135-f55e-469b-8315-0441b8057e85",
                "imagesId": "d6d116bf-631f-4fa5-8b1e-9b9265517a3d",
                "createdAt": "2024-06-29T05:10:37.452Z"
            },
            {
                "id": "2e674ee2-79e2-425a-b87b-c63a31fe3408",
                "title": "Cần cho thuê nhà nguyên căn, mặt tiền đường Nguyễn Trãi, Hiệp Phú, Quận 9",
                "labelCode": "0E5F",
                "address": "Địa chỉ: Phường Hiệp Phú, Quận 9, Hồ Chí Minh",
                "attributesId": "9e7dc74e-f3ca-4035-953e-4ac237b536b3",
                "categoryCode": "NCT",
                "description": "[\"Chính chủ cho thuê nhà nguyên căn, giá tốt tại:\",\"-Địa chỉ: Mặt tiền đường Nguyễn Trãi, P. Hiệp Phú, Q. 9, TP. HCM\",\"-Diện tích: 247 m2 (13m x19m ). Tổng diện tích sàn: 450 m2. Xây 3 tầng, có sân vườn rộng mát, sân thượng phơi đồ hoặc hóng gió view đẹp.\",\"-Nhà có:\",\"+Tầng trệt nhà xe phòng khách và bếp\",\"+Tầng 1: 2 phòng ngủ, phòng sinh hoạt\",\"+Tầng 2: 2 phòng ngủ và sân thượng\",\"+4 toilet\",\"Tiện ích:\",\"-Khu dân cư đông đúc, an ninh tốt, dân trí cao, gần trường tiểu học Đinh Tiên Hoàng, trường THCS Hoa Lư, ngay cạnh chợ Kiến Thiết, gần Coopmart Xa Lộ Hà Nội, Vincom Quận 9,… Giao thông thuận tiện\",\"-Thích hợp để làm văn phòng, trung tâm ngoại ngữ, ngân hàng,..\",\"-Rất thích hợp cho người nước ngoài thuê\",\"Giá cho thuê: 40 triệu/ tháng ( TL)\",\"Liên hệ: 0902973753 gặp a Thủ\"]",
                "userId": "04a979b6-8b27-4f50-a953-c320e3d67470",
                "overviewId": "c1382d99-60b2-4ea8-b6a9-10612c111bbb",
                "imagesId": "59da823a-b3df-42ac-96a4-448c240bb90c",
                "createdAt": "2024-06-26T10:35:38.682Z"
            },
            {
                "id": "2abd3671-ead1-4e6e-b222-66e9e5d944cb",
                "title": "CHO THUÊ NHÀ QUẬN 8 102M2 MỚI SẠCH SẼ AN NINH",
                "labelCode": "E28F",
                "address": "Địa chỉ: Mễ Cốc, Phường 15, Quận 8, Hồ Chí Minh",
                "attributesId": "8551ecd0-1621-4f84-a254-75d40c74e695",
                "categoryCode": "NCT",
                "description": "[\"Nhà 1 trệt 1 lầu, 2 phòng ngủ, 2 nhà vệ sinh, 1 phòng khách 1 nhà bếp, sân trước để xe, 2 kho đựng đồ, có giếng trời, không gian mát, thoáng, nhà mới , sạch sẽ, khu an ninh, yên tĩnh, kế bên chợ Rạch cát 3\"]",
                "userId": "9f8f16e6-1394-4c35-a3df-0e5ae0909027",
                "overviewId": "bb34c99b-18ac-49e0-9e5c-a80024c19d66",
                "imagesId": "d883969d-cb7d-4df7-a87b-1b5d2a1bbc68",
                "createdAt": "2024-06-29T20:39:39.911Z"
            },
            {
                "id": "08258267-a4bb-429a-9681-1b6aa8f321bc",
                "title": "Chính chủ cho thuê nhà phố, 1rệt 1lầu, giá mềm, tch08",
                "labelCode": "5BEB",
                "address": "Địa chỉ: 98/20/10 Tân Chánh Hiệp 8, Phường Tân Chánh Hiệp, Quận 12, Hồ Chí Minh",
                "attributesId": "b6da014c-d44e-49eb-bc01-b8e80349ad58",
                "categoryCode": "NCT",
                "description": "[\"Chính chủ cho thuê nhà phố 100m2, Tân Chánh Hiệp 8, quận 12.\",\"- Giá thuê 6 triệu.\",\"- Điện thoại: 0906 416 110 (a.Duong), 0975 311 713 (c.Ly).\",\"- Diện tích sử dụng: 100m2, 1 trệt 1 lầu, 2 phòng ngủ, 2 toilet, phòng khách, bếp tiện nghi\",\"- Sạch sẽ, an ninh đảm bảo (có cổng ra vào khu phố)\",\"- Nộ thất: ghế sofa, kệ tủ phòng khách, tủ tivi, tivi, tủ bép, máy khử mùi, máy nóng lạnh, bộ bàn ăn\",\"- Hẻm cụt, 5m2\",\"- Thích hợp vợ chồng trẻ, công chức.\"]",
                "userId": "26810662-6219-4f7a-b02a-25b2d98eb59e",
                "overviewId": "2a288d23-a859-41db-a95e-f674ba258c16",
                "imagesId": "16ce4a0d-1054-4182-ac35-42df7da857a0",
                "createdAt": "2024-06-27T06:35:40.985Z"
            },
            {
                "id": "56a8a19f-01d4-4e5c-9fa7-ef70eefb3029",
                "title": "Cho thuê biệt thự rộng rãi thoáng mát",
                "labelCode": "0E5F",
                "address": "Địa chỉ: Võ Văn Hát, Phường Long Trường, Quận 9, Hồ Chí Minh",
                "attributesId": "ec44be45-4d62-4656-a476-2d64b1156164",
                "categoryCode": "NCT",
                "description": "[\"Nhà biệt thự nguyên căn tầng lầu 2, gồm 3 phòng ngủ, phòng khách, phòng ăn, 3wc, có lối để xe máy, xe ô tô riêng dưới trệt, ko thu phí xe\"]",
                "userId": "b59f11c3-9e67-4d87-908b-8b2a13de668b",
                "overviewId": "a730ccb0-594f-4d8c-ae92-dbef0b285970",
                "imagesId": "4f2a3ae6-a972-415b-ae4a-0123641048de",
                "createdAt": "2024-06-23T03:26:41.958Z"
            },
            {
                "id": "7a4732c4-331f-496e-accc-efce5d316d65",
                "title": "Cho thuê nhà nguyên căn tại Ngõ Gốc Đề",
                "labelCode": "3FBF",
                "address": "Địa chỉ: Phường Hoàng Văn Thụ, Quận Hoàng Mai, Hà Nội",
                "attributesId": "b9a77a89-d8e6-41dc-82f6-dfc1ae10d89e",
                "categoryCode": "NCT",
                "description": "[\"Địa chỉ: Ngách 15/47 ngõ Gốc Đề\",\"Diện tích đất 30m2.\",\"4 tầng, 1 tum rộng rãi để phơi phóng\",\"Mặt tiền 4,3m\",\"Chủ nhà có mong muốn cho hộ gia đình thuê để giữ nhà.\",\"Liên hệ: 0979698768 (vui lòng nhắn tin Zalo trước khi gọi điện)\"]",
                "userId": "94664a39-66fa-4c17-a276-59e57cba12a9",
                "overviewId": "c1b46e64-9c1b-4008-80eb-dc75edd24e8c",
                "imagesId": "db039e75-aaad-434e-8495-920f360b76ce",
                "createdAt": "2024-06-28T22:23:43.015Z"
            },
            {
                "id": "cdd8aa83-3d9d-472d-ae29-bc296c894256",
                "title": "1 Trệt 1 lầu có máy lạnh (dãy nhà liền kề mini) sau lưng KS HOÀ PHÁT Phạm Văn Đồng",
                "labelCode": "0780",
                "address": "Địa chỉ: 1098/27A Đường Phạm Văn Đồng, Phường Linh Đông, Quận Thủ Đức, Hồ Chí Minh",
                "attributesId": "5afcce49-4f26-48b8-9fdd-949cfd8b9c33",
                "categoryCode": "NCT",
                "description": "[\"1 Trệt 1 lầu ban công (dãy nhà liền kề mini) sau lưng KS HOÀ PHÁT Phạm Văn Đồng Thủ Đức\",\"Ở 4 người thoải mái luôn\",\"Giá: 4,2 triệu/tháng (có máy lạnh)\",\"⭐ Bếp, WC riêng tiện lợi\",\"⭐ Có cửa sổ thoáng\",\"⭐ Có camera an ninh\",\"⭐ Có bảo trì nhanh chóng\",\"⭐ Giờ giấc tự do\",\"⭐️ Yên tĩnh, mát mẻ\",\"Ko ngăn phòng riêng\",\"Có nhà xe riêng\",\"Xe ô tô tận cửa nhà thuận tiện đi lại, gần bờ sông 5p: siêu thị chợ, phòng tập Gym,…\",\"Khoá Vân tay kết hợp khoá từ 2 lớp cùng hệ thống chuông báo động giữ an ninh an toàn cho cư dân.\",\"⭐ ĐC: 1098/27A Phạm Văn Đồng, P. Linh Đông,Thủ Đức (sau lưng KS HOÀ PHÁT Phạm Văn Đồng)\",\"Hẻm 526 Phạm Văn Đồng\",\"Vui lòng gọi: 0936783819\",\"Giá dịch vụ:\",\"1/ Điện: 3.500/kw\",\"2/ Nước: 15.000/m3\",\"3/ Rác: 50.000/phòng\",\"4/ Xe: 50.000/xe\",\"- HĐ: 12 tháng\",\"- Cọc: 1 tháng\",\"- Tiền nhà 1 tháng\",\"- Thu tiền: 1 Tây (trễ hạn ko quá 5 ngày\",\" \"]",
                "userId": "b202f3aa-777c-4f5a-b4eb-2b98a4d2150a",
                "overviewId": "dd441406-84a2-4fe4-a5b4-49f4e4839986",
                "imagesId": "4f8ccff7-dcee-46e4-8888-2d08c297c27a",
                "createdAt": "2024-06-28T22:07:44.289Z"
            },
            {
                "id": "4fe7c94a-b6e5-415f-bea2-8cb1d2fec4c5",
                "title": "Cho thuê nhà mặt tiền Kd p. Phú Thọ Hòa,Tân Phú dtsd 60 m2 chỉ 7triệu",
                "labelCode": "DCB0",
                "address": "Địa chỉ: Phường Phú Thọ Hòa, Quận Tân Phú, Hồ Chí Minh",
                "attributesId": "f48b8067-1410-4e51-b457-f2f70c1d8f92",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê nhà mặt tiền Kd p. Phú Thọ Hòa,Tân Phú dtsd 60 m2 chỉ 7triệu\",\"Nhanh còn kịp!\",\"Cho thuê nhà mặt tiền kinh doanh phường Phú Thọ Hòa, Tân Phú\",\"Dt 4x7m, trệt,lâu. Giá 7 triệu.\",\"Nếu thuê thêm phần lâu 1 bên cạnh nối liền diện tích 5x15m,có ban công 4m,2 phòng ngủ lớn, bếp tolet..view đẹp nhìn xuống mặt tiền đường xung quanh kính vì lúc trước bán cafe thì tất cả chỉ 12 triệu.\",\"- Nội thất gồm có máy lạnh, giường, tủ, tủ lạnh....full nội thất...\",\"Chủ nhà rất dễ thương.. tốt bụng...\",\"Vì trí gần trường học lễ Anh Xuân,Trần Phú,cho f18.UBP Phú Thọ Hòa.\",\"Tiện kinh doanh đa ngành nghề.\",\"Alo 0397077772 em chủ nhà\"]",
                "userId": "f9b5dde2-865f-4c51-abae-774c359b0e8d",
                "overviewId": "dd07e436-c727-459d-8a7d-713ed1f61e02",
                "imagesId": "488dc99a-fee4-4064-b8ea-4d8ef1afa263",
                "createdAt": "2024-06-28T16:11:45.294Z"
            },
            {
                "id": "4a274192-0034-41e6-8ad8-ee78a70de96c",
                "title": "NHÀ THẢO ĐIỀN CÓ SÂN, 3 LẦU - GIÁ CHỈ 20 TRIỆU",
                "labelCode": "2E61",
                "address": "Địa chỉ: Đường số 2, Phường Thảo Điền, Quận 2, Hồ Chí Minh",
                "attributesId": "51496175-4673-4b7e-a396-e109b1e2c40e",
                "categoryCode": "NCT",
                "description": "[\"+ Thông tin mô tả:\",\"Diện tích: 5x11m\",\"Kết cấu: 1 trệt 3 lầu, 3 phòng ngủ, 4WC\",\"Giá thuê: 20 triệu/tháng\",\"Khu an ninh tốt\",\"Đường lớn, không ngập nước\",\"Phù hợp làm văn phòng, hoặc ở\",\"Cho thuê lâu dài\",\"0901396167\",\"----------------------\",\"Mọi thông tin chi tiết vui lòng liên hệ: Ms Thuỷ để làm việc chính chủ.\",\"Công ty BĐS Anreal với giỏ hàng phong phú và giá tốt - tư vấn hỗ trợ nhiệt tình.\"]",
                "userId": "eb19a31d-3a12-4544-9b24-5127e5e941b4",
                "overviewId": "7d3bf125-3936-47b7-9fda-e63b2de7f6f3",
                "imagesId": "c9fb76b5-6fe8-419f-adbb-149bd1673d6b",
                "createdAt": "2024-06-27T15:19:46.552Z"
            },
            {
                "id": "7b59daf9-a57d-4391-9714-78803d7f1017",
                "title": "Nhà 5x20 , 1 lâu , Mới xây - 2 phòng - 16 triệu",
                "labelCode": "2E61",
                "address": "Địa chỉ: Đường số 25, Phường Bình An, Quận 2, Hồ Chí Minh",
                "attributesId": "0a658f0b-2496-4c1b-a5cf-a8a29916adc7",
                "categoryCode": "NCT",
                "description": "[\"NHÀ MỚI - ĐƯỜNG XE HƠI - 1 GÁC GIÁ 16 TRIỆU\",\"CÁCH ĐƯỜNG TRẦN NÃO 100M\",\"THÍCH HỢP LÀM VĂN PHÒNG + Ở\",\"GIÁ 16 TRIỆU\",\"VỊ TRÍ GẦN ĐƯỜNG TRẦN NÃO\",\"0909386167\"]",
                "userId": "045b0468-1058-4646-822e-2cf7413fb08e",
                "overviewId": "51f9db5a-c285-4f1f-8ccf-f0a9e3b087af",
                "imagesId": "179a7a1e-0b30-4899-827d-1aad03cbf394",
                "createdAt": "2024-06-25T01:07:47.509Z"
            },
            {
                "id": "f751b411-1769-4f68-b074-aace8eb3dbd5",
                "title": "Villa Phố Khu An Phú (7x20m)_5 Phòng Giá 28 Triệu",
                "labelCode": "2E61",
                "address": "Địa chỉ: 18 1, Phường An Phú, Quận 2, Hồ Chí Minh",
                "attributesId": "85e7291f-0859-49db-bc0d-95f1e3585938",
                "categoryCode": "NCT",
                "description": "[\"Cho thuê biệt thự phố khu An Phú\",\"Khuôn viên 7x20m - gồm 2 lầu, 5 phòng ngủ, 5wc\",\"Nhà có sẵn 1 số nội thất cơ bản, gara để xe hơi, sân trước\",\"Khu an ninh, yên tĩnh\",\"Thích hợp thuê ở gia đình hoặc làm văn phòng công ty\",\"Giá thuê chỉ 28 triệu/tháng\",\"0901396167 - 0909386167\",\"----------------------\",\"Công ty BĐS Anreal với giỏ hàng phong phú và giá tốt - tư vấn hỗ trợ nhiệt tình.\"]",
                "userId": "4d58e6c5-be69-4d5f-a1f6-68adf6b40fd6",
                "overviewId": "dc7628aa-3a17-4226-8af5-0628922d732d",
                "imagesId": "c3d932fd-06b2-4e9c-8c37-5e6612fadc44",
                "createdAt": "2024-06-23T14:35:48.467Z"
            }
        ]

        const response = [];
        for (let item of data) {
            const attribute = await db.Attribute.findAll(item.attributesId)
            const image = await db.Image.findAll(item.imagesId)
            const overview = await db.Overview.findAll(item.overviewId)
            const user = await db.User.findAll(item.userId)
            if (!attribute || !image || !overview || !user) {
                response.push({
                    attribute,
                    image,
                    overview,
                    user
                })
            }
        }

        return response
    } catch (error) {
        return error
    }

}