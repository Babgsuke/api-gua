const { exec } = require("child_process");

const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

function uniq8() {
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function decodeVmessLink(link) {
  const jsonBase64 = link.replace("vmess://", "");
  return Buffer.from(jsonBase64, "base64").toString("utf-8");
}

exports.createSsh = async (req, res) => {
  try {
    const user = "prem-" + uniq8();
    const cmd = `add-ssh ${user} ${user} 2 7`;

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      const links = stdout.match(/vmess:\/\/[^\s]+/g) || [];

      if (links.length === 0) {
        return res.status(404).json({
          success: false,
          message: "ssh link tidak ditemukan"
        });
      }

      const decodedLinks = decodeVmessLink(links[0])

      return res.json({
        success: true,
        data: decodedLinks
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};