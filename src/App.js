import "./app.scss";
import { Card, Button, Typography, Space, Input, Skeleton } from "antd";
import { useEffect, useState } from "react";

function App() {
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [support, setSupport] = useState();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  function submitHandler(){
    console.log(question,answer,support);
  }
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex" }}
      className="hotpot-app"
    >
      <Card className="my-header">
        <Title>Persian Hotpot QA</Title>
      </Card>
      <div className="text-container">
        <Card title="Paragraph1">
          {loading ? (
            <Skeleton active />
          ) : (
            <Text type="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
              senectus et netus. Mattis pellentesque id nibh tortor id aliquet
              lectus proin. Sapien faucibus et molestie ac feugiat sed lectus
              vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt
              ornare massa eget. Dictum varius duis at consectetur lorem. Nisi
              vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut
              tortor pretium viverra suspendisse potenti nullam. Et molestie ac
              feugiat sed lectus. Non nisi est sit amet facilisis magna.
              Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut
              enim blandit volutpat maecenas volutpat. Ornare lectus sit amet
              est placerat in egestas erat. Nisi vitae suscipit tellus mauris a
              diam maecenas sed. Placerat duis ultricies lacus sed turpis
              tincidunt id aliquet.
            </Text>
          )}
        </Card>
        <Card title="Paragraph2">
          {loading ? (
            <Skeleton active />
          ) : (
            <Text type="secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
              senectus et netus. Mattis pellentesque id nibh tortor id aliquet
              lectus proin. Sapien faucibus et molestie ac feugiat sed lectus
              vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt
              ornare massa eget. Dictum varius duis at consectetur lorem. Nisi
              vitae suscipit tellus mauris a diam maecenas sed enim. Velit ut
              tortor pretium viverra suspendisse potenti nullam. Et molestie ac
              feugiat sed lectus. Non nisi est sit amet facilisis magna.
              Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut
              enim blandit volutpat maecenas volutpat. Ornare lectus sit amet
              est placerat in egestas erat. Nisi vitae suscipit tellus mauris a
              diam maecenas sed. Placerat duis ultricies lacus sed turpis
              tincidunt id aliquet.
            </Text>
          )}
        </Card>
      </div>
      <div className="btn-container">
        <Button type="primary">Update</Button>
      </div>
      <Card className="support" title="Support">
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Text type="secondary" strong>
            Help : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Text>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
          />
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
          />
          <Input
            value={support}
            onChange={(e) => setSupport(e.target.value)}
            placeholder="Supporting text"
          />
          <div className="btn-container">
            <Button onClick={submitHandler} type="primary">Submit</Button>
          </div>
        </Space>
      </Card>
    </Space>
  );
}

export default App;
