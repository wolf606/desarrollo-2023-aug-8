const { getFileData } = require("../utils/files");

async function show(req, res) {
    const { folder1, folder2, filename } = req.params;
    const file = getFileData(filename, `${folder1}/${folder2}`);
    if (file !== null) {
        res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"');
        file.pipe(res);
    } else {
        res.status(404).send(
            {
                error: {
                    message: "File not found",
                    url: `${folder1}/${folder2}`
                }
            }
        );
    }
}

module.exports = {
    show
}