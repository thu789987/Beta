import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "9XhM2yKuKdKwjLNfLetBAR",
      token: "w3x1jk6JSqXkjJnn9pKeKIUZVVgypUoIzbxIiXdDEeMa0YvJIzoISYcU27nPPepvrBeJOURMJRZREJL5NoQ",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

import Markdown from "./components/Markdown";
import TextRotator from "./components/TextRotator";
import TypingAnimation from "./components/TypingAnimation";
import { MasonryLayout } from "./components/MasonryLayout";
import HoverReveal from './components/HoverReveal'; // Nhớ import đúng đường dẫn
import PatternGrid from './components/PatternGrid';
import { propagateServerField } from "next/dist/server/lib/render-server";

PLASMIC.registerComponent(Markdown, {
  name: "Markdown",
  props: {
    markdown: {
      type: "string",
      control: "large"
    }
  }
});


PLASMIC.registerComponent(TextRotator, {
  name: "textRotator",
  props: {
    text: {
      type: "object",
      defaultValue: ["Nhanh chóng", "Hiệu quả", "Đẹp mắt"],
      description: "Nhập danh sách chữ (dạng JSON array)",
    },
    interval: {
      type: "number", // Kiểu số
      defaultValue: 3000,
      description: "Thời gian đổi chữ (tính bằng ms, vd: 1000 = 1 giây)",
    },
  },
});


PLASMIC.registerComponent(TypingAnimation, {
  name: "TypingAnimation",
  props: {
    // Cho phép nhập danh sách chữ
    texts: {
      type: "object",
      defaultValue: ["Sáng tạo", "Chuyên nghiệp", "Tận tâm"],
      description: "Danh sách các dòng chữ sẽ gõ (JSON Array)",
    },
    // Cho phép chỉnh tốc độ gõ
    speed: {
      type: "number",
      defaultValue: 50,
      description: "Tốc độ gõ (1 = chậm, 99 = siêu nhanh)",
    },
    textColor: {
      type: 'color',
      displayName: 'Text Color',
      defaultValue: '#000000',
      keepCssVar: true // Quan trọng để giữ kết nối với Token [3]
    }
  },
});


PLASMIC.registerComponent(MasonryLayout, {
  name: "MasonryGrid",
  props: {
    children: {
      type: "slot", // Biến nó thành một ô trống để bạn kéo thả các Card vào
      defaultValue: {
        type: "text",
        value: "Kéo các Card vào đây để tạo hiệu ứng so le"
      }
    },
    columns: {
      type: "object",
      description: "Cấu hình số cột cho từng màn hình",
      defaultValue: { default: 4, 1100: 3, 700: 2 }
    }
  },
});

PLASMIC.registerComponent(HoverReveal, {
  name: 'HoverReveal',
  props: {
    // Tạo một Slot tên là children. 
    // Trong Studio, bạn có thể kéo text, ảnh, button thả vào đây.
    children: {
      type: 'slot',
      defaultValue: {
        type: 'text',
        value: 'Kéo thả nội dung vào đây...',
      },
    },
    
    // Tạo một nút gạt để giữ trạng thái mở khi đang design
    previewForceOpen: {
      type: 'boolean',
      displayName: 'Force Open (Editor)',
      description: 'Bật cái này để chỉnh sửa nội dung bên trong dễ hơn',
      defaultValue: false,
    },
  },
});

PLASMIC.registerComponent(PatternGrid, {
  name: 'PatternGrid',
  props: {
    children: 'slot',
    gap: {
      type: 'number',
      defaultValue: 16,
      displayName: 'Gap (px)'
    }
  },
});
