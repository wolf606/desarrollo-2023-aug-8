const { getFileData } = require("../utils/files");

async function show(req, res) {
    const { folder, filename } = req.params;
    const file = getFileData(filename, `uploads/${folder}`);
    if (file !== null) {
        res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"');
        file.pipe(res);
    } else {
        res.status(404).send(
            {
                error: {
                    message: "File not found",
                    url: `/uploads/${folder}/${filename}`
                }
            }
        );
    }
}

module.exports = {
    show
}