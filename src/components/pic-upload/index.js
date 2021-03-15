import React from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadPicAction } from "@/api/article";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  // 方法：图片预览
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    
  };

  Uploader = () => {
    const props = {
      /*  customRequest: (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        const originFile = file;
        console.log(options);
        // start：进度条相关
        // 伪装成 handleChange里面的图片上传状态
        const imgItem = {
          uid: "1", // 注意，这个uid一定不能少，否则上传失败
          name: "hehe.png",
          status: "uploading",
          url: "",
          percent: 99, // 注意不要写100。100表示上传完成
        };

        this.setState({
          fileList: [imgItem],
        }); // 更新 imgList
        // end：进度条相关

        const reader = new FileReader();
        reader.readAsDataURL(originFile); // 读取图片文件

        reader.onload = (file) => {
          console.log(file);
          const imgItem = {
            uid: "1", // 注意，这个uid一定不能少，否则上传失败
            name: "hehe.png",
            status: "done",
            percent: 100,
            url: file.target.result, // url 是展示在页面上的绝对链接
          };

          this.setState({
            fileList: [imgItem],
          }); // 更新 imgList
          /*     let formData = new FormData();
          formData.append("picture", originFile);
          // 上传图片的base64编码，调接口后，返回 imageId
          uploadPic(formData).then((res) => {
            formData.delete("picture");
            console.log("uploadPic", res);
           

           
          }); 
        };
      }, */
      name: "picture",
      action: uploadPicAction(),
      listType: "picture-card",
      fileList: this.fileList,
      onPreview: this.handlePreview,
      method: "POST",
      maxCount: 2,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      beforeUpload: (file) => {
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
          message.error(`${file.name} 不是png或者jpeg`);
        }
        return file.type === "image/png" ? true : Upload.LIST_IGNORE;
      },
      onChange: ({ file, fileList }) => {
        console.log(file, fileList);
        this.setState({ fileList });
        const newImgList = [];
        for (let item of fileList) {
          if (item.response) {
            newImgList.push(item.response.data[0]);
          }
        }
        this.props.handleImgListChange(newImgList);
      },
    };
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>配图</div>
      </div>
    );
    return (
      <Upload {...props}>
        {this.state.fileList.length >= 2 ? null : uploadButton}
      </Upload>
    );
  };
  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    return (
      <>
        <this.Uploader />
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
