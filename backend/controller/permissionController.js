const Admin = require("../models/Admin");
const rules = require("../rule.json");

module.exports = {
    list: async(req, res) => {
        let { data, paginate } = await Admin.list();
        res.render(admin_view + 'pages/permission', { accounts: data, paginate })
    },
    detail: async(req, res) => {
        let { id } = req.params;
        const availableRules = await Admin.getRules(id);
        res.render(admin_view + 'pages/permission-detail', { title: 'Edit', rules, availableRules, id });
    },
    approve: async(req, res) => {
        let { body } = req;
        const isComplete = await Admin.approve(body);
        if (isComplete) {
            res.render(admin_view + 'pages/permission-detail', { title: 'Edit', rules, id, notification: 'Xử lý xong' });
        }
    }
}