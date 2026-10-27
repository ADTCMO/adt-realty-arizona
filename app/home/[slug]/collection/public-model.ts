// @ts-nocheck
import { normalizeCollection, applyCollectionOptions } from './model';
/** Adapt the published-only RPC to the same presentation model as ACE preview. */
export function publicCollectionModel(listing, slug, preview = false) {
  const agent = listing.agent || {};
  const model = normalizeCollection({
    ...listing,
    property_photos: (Array.isArray(listing.photos) ? listing.photos : []).map((photo_url, sort_order) => ({ photo_url, sort_order })),
  }, {
    full_name: agent.name, phone: agent.phone, email: agent.email, profile_photo_url: agent.photo,
  }, { ...listing, slug, published: !preview });
  const showAgentPhoto = model.marketingSettings.pieces?.website?.showAgentPhoto;
  return { ...applyCollectionOptions(model, { showAgentPhoto }), publicUrlVerified: !preview && !!model.publicUrl };
}
