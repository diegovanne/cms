const MongoDB = require('../../core/mongodb');
const md5 = require('md5');
const { ObjectID } = require('mongodb');

module.exports = {
    getAdmin: async(email, password) => {
        return await MongoDB('Admin').findOne({ email, password: md5(password) })
    },

    getAdminFromID: async(_id) => {
        return await MongoDB('Admin').findOne({ _id: ObjectID(_id) })
    },
    list: async(page = 1, limit = 15) => {
        let count = await MongoDB('Admin').count();

        let totalPage = Math.ceil(count / limit);

        let paginate = {
            count,
            totalPage,
            limit,
            currentPage: parseInt(page),
            nextPage: page < totalPage ? parseInt(page + 1) : undefined,
            previousPage: page > 1 ? parseInt(page - 1) : undefined
        }
        let data = await MongoDB('Admin').find().skip((page - 1) * limit).limit(limit).toArray();
        return { data, paginate };
    },
    approve: async(paramRequest) => {
        const admin = await MongoDB('Admin').findOne({ _id: ObjectID(paramRequest.idUser) });
        let rules = [];
        paramRequest.rules.map(rule => {
            rules.push(rule);
        })
        const newAdmin = { $set: { rule: rules } };

        MongoDB('Admin').updateOne(admin, newAdmin, (err, result) => {
            if (err) {
                throw err
            }
        })

        return true;
    },
    getRules: async(id) => {
        const admin = await MongoDB('Admin').findOne({ _id: ObjectID(id) });
        return admin.rule;
    }
}