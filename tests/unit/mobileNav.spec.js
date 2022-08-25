import { mount } from '@vue/test-utils'
import NavMobile from "@/components/navigation/NavMobile";

describe('NavMobile.vue', () => {
  it('should nav be visible', async () => {
    const wrapper = mount(NavMobile);
    const button = wrapper.find('.nav_mobile');
    const icon = wrapper.find('.fa-bars-staggered');
    expect(icon.classes()).toContain('active');
    await button.trigger('click');

    expect(icon.classes('active')).toBe(false)
  })
})
