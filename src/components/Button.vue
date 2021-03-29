<script>
import {h} from 'vue'

export default {
  name: "Button",
  props: ["text", "url", "tag"],
  setup(props) {
    const {tag, url, text} = props
    const classes = "rounded bg-green-600 px-4 py-3 text-white font-bold inline-block cursor-pointer"
    return () => h(tag || "a", {class: classes, href: url}, text)
  }
}
</script>