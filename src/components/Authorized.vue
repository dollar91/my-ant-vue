<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    if (props.authority.length && check(props.authority)) {
      return scopedSlots.default();
    }
    return null;
  }
};
</script>

<style></style>
