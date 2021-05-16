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
export default class PicturesWall extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      hasSync: false,
    };
  }
  componentDidUpdate() {
    if (this.props.fileList.length > 0 && !this.state.hasSync) {
      this.setState({
        fileList: this.props.fileList,
        hasSync: true,
      });
    }
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

  Uploader = () => {
    const props = {
      name: "picture",
      action: uploadPicAction(),
      listType: "picture-card",
      fileList: this.state.fileList,
      onPreview: this.handlePreview,
      method: "POST",
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
